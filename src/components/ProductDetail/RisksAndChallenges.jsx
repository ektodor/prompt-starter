import { SVGColorComponent } from "../SVGColorComponent";

export function RisksAndChallenges({ risksAndChallenges }) {
  const { preface, elaborate, disclosure } = risksAndChallenges;

  return (
    <div>
      <h2 className="text-h4 lg:text-h3 text-neutral-900 mb-4 lg:mb-6">
        風險與挑戰
      </h2>

      {preface && (
        <p className="text-text3 text-neutral-700 mb-4 lg:mb-6">{preface}</p>
      )}

      {elaborate.length && (
        <ul className="flex flex-col gap-6 mb-6">
          {elaborate.map((item) => (
            <li key={item.id} className="flex flex-col gap-3">
              <h6 className="text-h6 text-neutral-700">{item.title}</h6>
              <p className="text-text3 text-neutral-700">{item.rac}</p>
              {item.countermeasures && (
                <div className="border border-neutral-300 bg-neutral-100 rounded-[10px] p-4">
                  <div className="flex items-center gap-[2px] mb-2">
                    <img
                      src="./icons/lightbulb_yellow.svg"
                      alt="lightbulb_yellow"
                    />
                    <h6 className="font-medium text-[16px] leading-[1.5] text-neutral-700">
                      應對措施
                    </h6>
                  </div>
                  <p className="text-text3 text-neutral-700">
                    {item.countermeasures}
                  </p>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      {disclosure && (
        <p className="pl-4 text-h6 text-primary-500 border-s-4 border-primary-500">
          {disclosure}
        </p>
      )}
    </div>
  );
}
