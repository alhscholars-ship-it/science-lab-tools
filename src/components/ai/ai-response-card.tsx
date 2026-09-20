type AIResponseCardProps = {
  title: string;
  children: React.ReactNode;
};


export function AIResponseCard({
  title,
  children,
}: AIResponseCardProps) {

  return (
    <section className="article-section">
      <div className="article-content">

        <h3>
          {title}
        </h3>

        {children}

      </div>
    </section>
  );

}
