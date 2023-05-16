function HomePage() {
	return (
		<div className='mx-auto container px-2 sm:px-6 lg:px-8 mt-32 pb-32 max-w-2xl'>
			<h1 className='text-center text-2xl font-medium'>Introduction</h1>
			<div className='mt-10'>
				<p className='text-center'>Bài test sử dụng các công nghệ: </p>
				<ul className='list-disc pl-5 mt-2'>
					<li>Redux toolkit cho việc quản lý state</li>
					<li>Axios cho việc kết nối với Backend</li>
					<li>LocalStorage cho việc lưu tạm dữ liệu</li>
					<li>Typescritp cho việc viết code nghiêm ngặt hơn</li>
					<li>React hook form cho việc handle các form</li>
				</ul>
			</div>
			<div className='mt-10'>
				<p className='text-center'>Các chức năng hoàn thành: </p>
				<ul className='list-disc pl-5 mt-2'>
					<li>CRUD Users</li>
					<li>CRUD Articles</li>
					<li>CRUD Comments (Update comments em không thấy có api ạ)</li>
					<li>Auth: Bao gồm Register, Login, Logout, Procted route</li>
				</ul>
			</div>
		</div>
	)
}

export default HomePage
