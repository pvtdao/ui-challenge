import React from 'react'
import { DropTargetMonitor, XYCoord, useDrag, useDrop } from 'react-dnd'
import { useFormContext } from 'react-hook-form'
import { FiDelete, FiSettings } from 'react-icons/fi'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { RootState } from '../../app/store'
import { ArticelSchema } from '../../schema/article'
import { DragItem } from '../../schema/dnd'

const ItemTypes = {
	CARD: 'CARD'
}

type ArticleCartPropsType = {
	article: ArticelSchema
	handleDeleteArticle: (slug: string) => Promise<void>
	position: number
	moveArticle: (dragIndex: number, hoverIndex: number) => void
}

function ArticleCart({
	article,
	handleDeleteArticle,
	position,
	moveArticle
}: ArticleCartPropsType) {
	const methods = useFormContext()
	const ref = React.useRef<HTMLDivElement>(null)

	const navigate = useNavigate()
	const user = useSelector((state: RootState) => state.user)

	const [{ handlerId }, drop] = useDrop({
		accept: ItemTypes.CARD,
		collect(monitor) {
			return {
				handlerId: monitor.getHandlerId()
			}
		},
		hover: (item: DragItem, monitor: DropTargetMonitor) => {
			if (!ref.current) return

			const dragIndex = item.index
			const hoverIndex = position

			if (dragIndex === hoverIndex) return

			const hoverBoundingRect = ref.current?.getBoundingClientRect()
			const hoverMiddleY =
				(hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

			const clientOffset = monitor.getClientOffset()
			const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return
			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return

			moveArticle(dragIndex, hoverIndex)

			item.index = hoverIndex
		}
	})

	const [{ isDragging }, drag] = useDrag({
		type: ItemTypes.CARD,
		item: {
			type: ItemTypes.CARD,
			id: article.id.toString(),
			index: position,
			derp: 'derp'
		},
		collect: (monitor: any) => ({
			isDragging: monitor.isDragging()
		})
	})

	const opacity = isDragging ? 0 : 1
	drag(drop(ref))

	return (
		<div
			data-handler-id={handlerId}
			ref={ref}
			style={{ border: '.5px solid rgba(0, 0, 0, .2)', opacity }}
			className='w-full rounded-md px-3 py-2 relative min-h-[300px]'
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
			<div className='flex flex-wrap items-center gap-2'>
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
