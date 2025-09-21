import DotStyleTree from "@/components/DotStyleTree/DotStyleTree";

export function ProductDetailItem({ detailItem }) {
  const {
    title,
    detailsImg,
    productIntroduction,
    productContents,
    emphasizeContent,
  } = detailItem;

  return (
    <section className="mb-6 lg:mb-10">
      {title && (
        <h2 className="text-h4 lg:text-h3 text-neutral-900 mb-4 lg:mb-6">
          {title}
        </h2>
      )}

      {detailsImg.length && (
        <div className="flex flex-col gap-4 lg:gap-6 mb-4 lg:mb-6">
          {detailsImg.map((img) => (
            <img
              key={img.id}
              src={img.img}
              alt={img.alt}
              className="rounded-[10px]"
            />
          ))}
        </div>
      )}

      {productIntroduction.length && (
        <div className="flex flex-col gap-4 lg:gap-6 mb-4 lg:mb-6">
          {productIntroduction.map((intro) => (
            <p key={intro.id} className="text-text3 text-neutral-900">
              {intro.introduction}
            </p>
          ))}
        </div>
      )}

      {productContents.length && (
        <div className="mb-4 lg:mb-6">
          <DotStyleTree
            data={productContents}
            branchesStyle="px-4 border-s-4 border-primary-500"
            groupStyle="text-primary-500 mb-2"
          />
        </div>
      )}

      {emphasizeContent.length && (
        <div className="flex flex-col gap-4 lg:gap-6 mb-4 lg:mb-6">
          {emphasizeContent.map((content) => (
            <div
              key={content.id}
              className="p-4 bg-neutral-100 border border-neutral-300 rounded-[10px] w-fit flex items-center"
            >
              {content.icon && (
                <img
                  src={content.icon}
                  alt={content.iconAlt}
                  className="mr-[2px]"
                />
              )}
              {content.emoji && (
                <span className="text-text3 mr-1">{content.emoji}</span>
              )}
              <p className="font-medium text-text3 text-neutral-700">
                {content.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
