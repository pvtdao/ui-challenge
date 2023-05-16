import { FiDelete, FiSettings } from 'react-icons/fi'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { RootState } from '../../app/store'
import { ArticelSchema } from '../../schema/article'

type ArticleCartPropsType = {
	article: ArticelSchema
	handleDeleteArticle: (slug: string) => Promise<void>
}

function ArticleCart({ article, handleDeleteArticle }: ArticleCartPropsType) {
	const navigate = useNavigate()
	const user = useSelector((state: RootState) => state.user)

	return (
		<div
			style={{ border: '.5px solid rgba(0, 0, 0, .2)' }}
			className='w-full rounded-md px-3 py-2 relative h-[300px]'
		>
			<h1
				className='font-bold line-clamp-2 mb-5 cursor-pointer'
				onClick={() => navigate(`/articles/${article.slug}`)}
			>
				{article.title}
			</h1>
			<p className='line-clamp-4 mb-5 min-h-[100px] max-h-[100px]'>
				{article.description}
			</p>
			<div className='flex items-center gap-2'>
				{article.tagList.map((tag, idx) => {
					return (
						<div className='relative group' key={idx}>
							<p className='bg-primary text-white px-2 py-1 rounded-md'>
								{tag}
							</p>
						</div>
					)
				})}
			</div>

			<div className='mt-10 text-sm flex justify-between items-center'>
				<p>
					Posted by:{' '}
					<span
						onClick={() => navigate(`/users/${article.author.username}`)}
						className='font-medium cursor-pointer'
					>
						{article.author.username}
					</span>
				</p>
				{user.current !== null && (
					<div className='flex gap-2 items-center'>
						<button title='Delete'>
							<FiDelete
								className='text-2xl'
								onClick={() => handleDeleteArticle(article.slug)}
							/>
						</button>
						<Link to={`${article.slug}/update`} title='Update'>
							<FiSettings className='text-2xl' />
						</Link>
					</div>
				)}
			</div>
		</div>
	)
}

export default ArticleCart
