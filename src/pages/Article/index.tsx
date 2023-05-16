import { useEffect, useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { ArticelSchema } from '../../schema/article'
import { deleteArticleBySlug, getAllArticles } from '../../services/article'
import ArticleCart from './ArticleCard'

function ArticlePage() {
	const [articleList, setArticleList] = useState<ArticelSchema[]>([])

	const methods = useForm({
		defaultValues: {
			articlesList: articleList
		}
	})

	const { fields, move } = useFieldArray({
		control: methods.control,
		name: 'articlesList'
	})

	function moveArticle(dragIndex: number, hoverIndex: number) {
		move(dragIndex, hoverIndex)
	}

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

	useEffect(() => {
		methods.setValue('articlesList', articleList)
	}, [articleList])

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

			{fields.length === 0 ? (
				<h1 className='py-10 text-xl text-center leading-[27px] font-semibold lg:text-2xl'>
					Không có dữ liệu
				</h1>
			) : (
				<FormProvider {...methods}>
					<form>
						<div className='py-10 grid sm:grid-cols-2 lg:grid-cols-3 place-items-center gap-3'>
							<DndProvider backend={HTML5Backend}>
								{fields.map((aritcle, index) => {
									return (
										<ArticleCart
											article={aritcle}
											key={aritcle.id}
											handleDeleteArticle={(slug: string) =>
												handleDeleteArticle(slug)
											}
											position={index}
											moveArticle={moveArticle}
										/>
									)
								})}
							</DndProvider>
						</div>
					</form>
				</FormProvider>
			)}
		</div>
	)
}

export default ArticlePage
