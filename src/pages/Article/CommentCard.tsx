import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import avataPlaceholder from '../../asset/images/avatar-placeholder.png'
import Button from '../../components/common/Button'
import { CommentSchema } from '../../schema/article'

type CommentCardPropsType = {
	comments: CommentSchema
	handleDeleteComment: (id: number) => Promise<void>
	handleUpdateComment: (id: number, payload: { body: string }) => Promise<void>
}

function CommentCard({
	comments,
	handleDeleteComment,
	handleUpdateComment
}: CommentCardPropsType) {
	const { author, body, id } = comments

	const user = useSelector((state: RootState) => state.user)

	return (
		<div className='flex gap-5 mb-5 relative group'>
			<div className='rounded-full w-[50px] h-[50px] flex-shrink-0'>
				<img
					className='rounded-full h-full w-full object-cover'
					src={author.image || avataPlaceholder}
					alt={author.username}
				/>
			</div>
			<div className='md:max-w-2xl pr-5'>
				<p className='font-bold'>{author.username}</p>
				<p>{body}</p>
			</div>
			{user.current !== null && (
				<div className='hidden group-hover:flex gap-2 justify-end h-auto'>
					<Button
						onClick={() =>
							handleUpdateComment(id, { body: 'Update comment nè' })
						}
						className='text-sm h-8 flex items-center justify-center rounded bg-black text-white py-2 px-4'
					>
						Sửa
					</Button>
					<Button
						onClick={() => handleDeleteComment(id)}
						className='text-sm h-8 flex items-center justify-center rounded bg-error text-white py-2 px-4'
					>
						Xóa
					</Button>
				</div>
			)}
		</div>
	)
}

export default CommentCard
