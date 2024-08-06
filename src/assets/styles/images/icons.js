const icons = import.meta.glob('./*.svg', { eager: true });

export default Object.fromEntries(
	Object.entries(icons).map(([key, value]) => {
		const iconName = key.replace('./', '').replace('.svg', '');
		return [iconName, value.default];
	})
);
