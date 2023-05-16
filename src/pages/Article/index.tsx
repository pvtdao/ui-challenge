import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArticelSchema } from '../../schema/article'
import { deleteArticleBySlug, getAllArticles } from '../../services/article'
import ArticleCart from './ArticleCard'

function ArticlePage() {
	const [articleList, setArticleList] = useState<ArticelSchema[]>([])

	async function fetchArticel() {
		try {
			const data = await getAllArticles()
			setArticleList(data.articles)
		} catch (error) {
			console.error('Fail to fetch all user: ', error)
		}
	}

	async function handleDeleteArticle(slug: string) {
		try {
			await deleteArticleBySlug(slug)
			fetchArticel()
		} catch (error) {
			console.error('Fail to delete article: ', error)
		}
	}

	useEffect(() => {
		fetchArticel()
	}, [])

	return (
		<div className='mx-auto container px-2 sm:px-6 lg:px-8 mt-32 pb-32'>
			<div className='flex items-center justify-between'>
				<h1 className='text-center text-2xl font-medium'>Articles</h1>
				<Link
					to='/articles/new'
					className='text-sm rounded bg-black text-white py-2 px-5'
				>
					New
				</Link>
			</div>

			{articleList.length === 0 ? (
				<h1 className='py-10 text-xl text-center leading-[27px] font-semibold lg:text-2xl'>
					Không có dữ liệu
				</h1>
			) : (
				<div className='py-10 grid sm:grid-cols-2 md:grid-cols-3 place-items-center gap-3'>
					{articleList.map((aritcle) => {
						return (
							<ArticleCart
								article={aritcle}
								key={aritcle.id}
								handleDeleteArticle={(slug: string) =>
									handleDeleteArticle(slug)
								}
							/>
						)
					})}
				</div>
			)}
		</div>
	)
}

export default ArticlePage
