export default function InterestTag({
	value,
	name = "interests",
	register
}) {
	return (
		<label className="
			py-3.5
			border border-neutral-300
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
				value={value}
				{...register(name)}
				className="hidden"
			/>
			{value}
		</label>
	);
}