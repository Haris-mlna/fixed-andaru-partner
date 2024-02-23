export const ButtonNavigation = ({ children, newclassname, ...props }) => {
	return (
		<button
			className={`w-full h-8 flex justify-between items-center px-2 text-sm rounded  transition-all duration-150 hover:bg-slate-200 ${newclassname}`}
			{...props}>
			{children}
		</button>
	);
};
