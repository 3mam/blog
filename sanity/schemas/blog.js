export default {
	name: 'blog',
	title: 'Blog',
	type: 'document',
	fields: [
		{
			name: 'title',
			title: 'Tytuł artykułu ✍️',
			type: 'string',
		},
		{
			name: 'description',
			title: 'Opis',
			type: 'text'
		},
		{
			name: 'content',
			title: 'Treść',
			type: 'text'
		},
		{
			name: 'image',
			title: 'Obraz',
			type: 'img'
		},
		{
			name: 'releaseDate',
			title: 'Data publikacji',
			type: 'date'
		},
	]
}