import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import {
  AIProviderError,
  generateWithCloudAI,
} from "./cloud";

describe("cloud AI providers", () => {

  describe("Gemini controlled retry", () => {
    const successResponse = () =>
      new Response(
        JSON.stringify({
          candidates: [{
            content: {
              parts: [{ text: "Retry succeeded." }],
            },
          }],
        }),
        { status: 200 },
      );

    it("retries one network failure and succeeds", async () => {
      vi.stubEnv("AI_CLOUD_PROVIDER", "gemini");

      const fetchMock = vi.fn()
        .mockRejectedValueOnce(new Error("Network failure"))
        .mockResolvedValueOnce(successResponse());

      vi.stubGlobal("fetch", fetchMock);

      await expect(generateWithCloudAI("Test retry"))
        .resolves.toBe("Retry succeeded.");

      expect(fetchMock).toHaveBeenCalledTimes(2);
    });

    it("retries one timeout and succeeds", async () => {
      vi.stubEnv("AI_CLOUD_PROVIDER", "gemini");

      const timeout = new Error("Request timed out");
      timeout.name = "TimeoutError";

      const fetchMock = vi.fn()
        .mockRejectedValueOnce(timeout)
        .mockResolvedValueOnce(successResponse());

      vi.stubGlobal("fetch", fetchMock);

      await expect(generateWithCloudAI("Test timeout"))
        .resolves.toBe("Retry succeeded.");

      expect(fetchMock).toHaveBeenCalledTimes(2);
    });

    it("does not retry HTTP 429", async () => {
      vi.stubEnv("AI_CLOUD_PROVIDER", "gemini");

      const fetchMock = vi.fn().mockResolvedValue(
        new Response("Rate limited", { status: 429 }),
      );

      vi.stubGlobal("fetch", fetchMock);

      await expect(generateWithCloudAI("Test quota"))
        .rejects.toMatchObject({
          provider: "gemini",
          status: 429,
        });

      expect(fetchMock).toHaveBeenCalledTimes(1);
    });

    it("does not retry upstream HTTP 503", async () => {
      vi.stubEnv("AI_CLOUD_PROVIDER", "gemini");

      const fetchMock = vi.fn().mockResolvedValue(
        new Response("Unavailable", { status: 503 }),
      );

      vi.stubGlobal("fetch", fetchMock);

      await expect(generateWithCloudAI("Test upstream"))
        .rejects.toMatchObject({
          provider: "gemini",
          status: 503,
        });

      expect(fetchMock).toHaveBeenCalledTimes(1);
    });

    it("stops after two network failures", async () => {
      vi.stubEnv("AI_CLOUD_PROVIDER", "gemini");

      const fetchMock = vi.fn()
        .mockRejectedValue(new Error("Network unavailable"));

      vi.stubGlobal("fetch", fetchMock);

      await expect(generateWithCloudAI("Test max attempts"))
        .rejects.toMatchObject({
          provider: "gemini",
          status: 503,
        });

      expect(fetchMock).toHaveBeenCalledTimes(2);
    });
  });



  it("supports explicit Gemini mode", async () => {
    vi.stubEnv("AI_CLOUD_PROVIDER", "gemini");

    const fetchMock = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
          candidates: [{
            content: {
              parts: [{ text: "Gravity attracts masses." }],
            },
          }],
        }),
        { status: 200 },
      ),
    );

    vi.stubGlobal("fetch", fetchMock);

    expect(await generateWithCloudAI("Define gravity"))
      .toBe("Gravity attracts masses.");

    expect(fetchMock).toHaveBeenCalledOnce();
    expect(fetchMock.mock.calls[0][0]).toContain(
      "generativelanguage.googleapis.com",
    );
  });

  it("auto mode selects Gemini when OpenAI key is missing", async () => {
    vi.stubEnv("AI_CLOUD_PROVIDER", "auto");
    delete process.env.OPENAI_API_KEY;

    const fetchMock = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
          candidates: [{
            content: {
              parts: [{ text: "An atom is a unit of matter." }],
            },
          }],
        }),
        { status: 200 },
      ),
    );

    vi.stubGlobal("fetch", fetchMock);

    expect(await generateWithCloudAI("Define atom"))
      .toBe("An atom is a unit of matter.");

    expect(fetchMock).toHaveBeenCalledOnce();
  });

  it("rejects invalid provider configuration", async () => {
    vi.stubEnv("AI_CLOUD_PROVIDER", "invalid");

    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    await expect(
      generateWithCloudAI("Define energy"),
    ).rejects.toThrow("Invalid AI_CLOUD_PROVIDER configuration");

    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("rejects missing credentials in Gemini-only mode", async () => {
    vi.stubEnv("AI_CLOUD_PROVIDER", "gemini");
    delete process.env.GEMINI_API_KEY;

    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    await expect(
      generateWithCloudAI("Define acceleration"),
    ).rejects.toMatchObject({
      provider: "gemini",
      status: 503,
    });

    expect(fetchMock).not.toHaveBeenCalled();
  });


  const originalOpenAI = process.env.OPENAI_API_KEY;
  const originalGemini = process.env.GEMINI_API_KEY;

  beforeEach(() => {
    process.env.OPENAI_API_KEY = "test-openai-key";
    process.env.GEMINI_API_KEY = "test-gemini-key";
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();

    if (originalOpenAI === undefined) {
      delete process.env.OPENAI_API_KEY;
    } else {
      process.env.OPENAI_API_KEY = originalOpenAI;
    }

    if (originalGemini === undefined) {
      delete process.env.GEMINI_API_KEY;
    } else {
      process.env.GEMINI_API_KEY = originalGemini;
    }
  });


  describe("Gemini diagnostic security", () => {
    const secret = "PRIVATE_TEST_API_KEY_123";
    const prompt = "PRIVATE_TEST_PROMPT_456";

    beforeEach(() => {
      vi.stubEnv("AI_CLOUD_PROVIDER", "gemini");
      process.env.GEMINI_API_KEY = secret;
    });

    it.each([
      [429, "upstream_http"],
      [503, "upstream_http"],
    ])(
      "logs upstream HTTP %i safely",
      async (status, category) => {
        const warning = vi.spyOn(console, "warn")
          .mockImplementation(() => {});

        vi.stubGlobal(
          "fetch",
          vi.fn().mockResolvedValue(
            new Response("PRIVATE_RESPONSE_BODY", { status }),
          ),
        );

        await expect(
          generateWithCloudAI(prompt),
        ).rejects.toMatchObject({
          provider: "gemini",
          status,
        });

        expect(warning).toHaveBeenCalledOnce();
        expect(warning.mock.calls[0][1]).toMatchObject({
          provider: "gemini",
          category,
          status,
        });

        const logged = JSON.stringify(warning.mock.calls);

        expect(logged).not.toContain(secret);
        expect(logged).not.toContain(prompt);
        expect(logged).not.toContain("PRIVATE_RESPONSE_BODY");

        warning.mockRestore();
      },
    );

    it("logs network failure without secrets", async () => {
      const warning = vi.spyOn(console, "warn")
        .mockImplementation(() => {});

      vi.stubGlobal(
        "fetch",
        vi.fn().mockRejectedValue(
          new Error("PRIVATE_NETWORK_DETAIL"),
        ),
      );

      await expect(
        generateWithCloudAI(prompt),
      ).rejects.toMatchObject({
        provider: "gemini",
        status: 503,
      });

      expect(warning.mock.calls[0][1]).toMatchObject({
        category: "network_error",
        status: 503,
      });

      expect(JSON.stringify(warning.mock.calls))
        .not.toContain("PRIVATE_NETWORK_DETAIL");

      warning.mockRestore();
    });

    it("logs timeout category", async () => {
      const warning = vi.spyOn(console, "warn")
        .mockImplementation(() => {});

      const timeoutError = new Error("Timed out");
      timeoutError.name = "TimeoutError";

      vi.stubGlobal(
        "fetch",
        vi.fn().mockRejectedValue(timeoutError),
      );

      await expect(
        generateWithCloudAI(prompt),
      ).rejects.toMatchObject({
        provider: "gemini",
        status: 503,
      });

      expect(warning.mock.calls[0][1]).toMatchObject({
        category: "timeout",
        status: 503,
      });

      warning.mockRestore();
    });

    it("logs an empty Gemini answer without secrets", async () => {
      const warning = vi.spyOn(console, "warn")
        .mockImplementation(() => {});

      try {
        vi.stubGlobal(
          "fetch",
          vi.fn().mockResolvedValue(
            new Response(
              JSON.stringify({
                candidates: [],
                privateDetail: "PRIVATE_RESPONSE_BODY",
              }),
              { status: 200 },
            ),
          ),
        );

        await expect(
          generateWithCloudAI(prompt),
        ).rejects.toMatchObject({
          provider: "gemini",
          status: 502,
        });

        expect(warning).toHaveBeenCalledOnce();

        expect(warning.mock.calls[0][0])
          .toBe("[AI_PROVIDER_DIAGNOSTIC]");

        expect(warning.mock.calls[0][1]).toEqual({
          provider: "gemini",
          category: "empty_answer",
          status: 502,
        });

        const logged = JSON.stringify(warning.mock.calls);

        expect(logged).not.toContain(secret);
        expect(logged).not.toContain(prompt);
        expect(logged).not.toContain("PRIVATE_RESPONSE_BODY");
      } finally {
        warning.mockRestore();
      }
    });

    it("logs invalid JSON safely", async () => {
      const warning = vi.spyOn(console, "warn")
        .mockImplementation(() => {});

      vi.stubGlobal(
        "fetch",
        vi.fn().mockResolvedValue(
          new Response("INVALID_PRIVATE_JSON", { status: 200 }),
        ),
      );

      await expect(
        generateWithCloudAI(prompt),
      ).rejects.toMatchObject({
        provider: "gemini",
        status: 502,
      });

      expect(warning.mock.calls[0][1]).toMatchObject({
        category: "invalid_json",
        status: 502,
      });

      expect(JSON.stringify(warning.mock.calls))
        .not.toContain("INVALID_PRIVATE_JSON");

      warning.mockRestore();
    });
  });


  it("uses OpenAI as primary provider", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
          choices: [
            { message: { content: "Force is a push or pull." } },
          ],
        }),
        { status: 200 },
      ),
    );

    vi.stubGlobal("fetch", fetchMock);

    const result = await generateWithCloudAI("Define force");

    expect(result).toBe("Force is a push or pull.");
    expect(fetchMock).toHaveBeenCalledOnce();
    expect(fetchMock.mock.calls[0][0]).toContain(
      "api.openai.com",
    );
  });

  it("falls back to Gemini on OpenAI server failure", async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(
        new Response("Unavailable", { status: 503 }),
      )
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({
            candidates: [
              {
                content: {
                  parts: [{ text: "Energy is the capacity to do work." }],
                },
              },
            ],
          }),
          { status: 200 },
        ),
      );

    vi.stubGlobal("fetch", fetchMock);

    const result = await generateWithCloudAI("Define energy");

    expect(result).toBe(
      "Energy is the capacity to do work.",
    );
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock.mock.calls[1][0]).toContain(
      "generativelanguage.googleapis.com",
    );
  });

  it("does not fall back on OpenAI authentication failure", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response("Unauthorized", { status: 401 }),
    );

    vi.stubGlobal("fetch", fetchMock);

    await expect(
      generateWithCloudAI("What is gravity?"),
    ).rejects.toMatchObject({
      provider: "openai",
      status: 401,
    });

    expect(fetchMock).toHaveBeenCalledOnce();
  });

  it("rejects missing OpenAI credentials", async () => {
    delete process.env.OPENAI_API_KEY;

    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    await expect(
      generateWithCloudAI("What is an atom?"),
    ).rejects.toBeInstanceOf(AIProviderError);

    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("rejects an empty OpenAI answer", async () => {
    delete process.env.GEMINI_API_KEY;

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({ choices: [] }),
          { status: 200 },
        ),
      ),
    );

    await expect(
      generateWithCloudAI("Explain velocity"),
    ).rejects.toMatchObject({
      provider: "openai",
      status: 502,
    });
  });
});
