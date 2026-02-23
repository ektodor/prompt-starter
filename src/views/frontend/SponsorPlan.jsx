import { ButtonComponent } from "@/components/buttons/ButtonComponent";
import { SVGColorComponent } from "@/components/SVGColorComponent";
import { useGetProjectDetail } from "@/hooks/useProject";
import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router";

export function SponsorPlan() {
  const { projectId } = useParams();
  const { data } = useGetProjectDetail(projectId);
  const [projectDetail, setProjectDetail] = useState({});
  useEffect(() => {
    if (data) {
      setProjectDetail(data.data);
      console.log(data.data);
    }
  }, [data]);
  return (
    <main>
      {/* banner */}
      <section
        className="bg-white bg-center bg-cover"
        style={{ backgroundImage: 'url("./images/bg-linear.webp")' }}
      >
        <div className="py-6 lg:py-16">
          <div className="container">
            <div
              className="p-6 lg:p-20 rounded-[20px]"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
            >
              <div className="block lg:flex gap-10">
                <img
                  src={projectDetail.cover_image_url}
                  alt="project 2"
                  className="w-full mb-4 lg:mb-0 lg:w-[36.35%] aspect-[16/9] rounded-[10px] object-cover flex-auto"
                />

                <div className="w-full lg:w-3/5 flex-auto">
                  <ul className="py-[7px] mb-2 flex gap-4 flex-wrap lg:mb-3 lg:gap-3">
                    {}
                    {projectDetail.project_tags?.map((item, index) => {
                      return index === 0 ? (
                        <li
                          key={item.tags.id}
                          className="bg-blue-100 rounded-xl text-text5 px-3 py-1 text-blue-700 lg:text-text4"
                        >
                          {item.tags.tag_name}
                        </li>
                      ) : (
                        <li
                          key={item.tags.id}
                          className="text-text4 text-neutral-500 lg:text-text3"
                        >
                          # {item.tags.tag_name}
                        </li>
                      );
                    })}
                  </ul>
                  <h2 className="text-h3 lg:text-h3 mb-2 lg:mb-3">
                    {projectDetail.title}
                  </h2>
                  <div className="flex items-center mb-6">
                    <span className="inline-block p-1 bg-neutral-300 rounded-full mr-1">
                      <SVGColorComponent
                        url={"./icons/person.svg"}
                        color="bg-neutral-0"
                        size="size-[16px]"
                      />
                    </span>
                    <span className="text-neutral-500 text-text5 lg:text-text4">
                      {projectDetail.owner_name}
                    </span>
                  </div>
                  <p className="text-h5 lg:text-h2">
                    NT$
                    {projectDetail?.current_amount &&
                      projectDetail.current_amount.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Outlet projectDetail={projectDetail} />
    </main>
  );
}
