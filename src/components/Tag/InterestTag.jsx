export default function InterestTag({
	value,
	name = "interests",
	defaultChecked = false
}) {
	return (
		<label className="
			py-3.5
			border-1 border-neutral-300
			rounded-xl
			font-bold text-center
			cursor-pointer
			hover:border-primary
			has-[:checked]:border-primary
			has-[:checked]:text-primary
			has-[:checked]:before:content-['✓_']
			"
		>
			<input
				type="checkbox"
				name={name}
				value={value}
				defaultChecked={defaultChecked}
				className="hidden"
			/>
			{value}
		</label>
	);
}