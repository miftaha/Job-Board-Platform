interface CategoryCardProps {
  title: string
}

const CategoryCard = ({ title }: CategoryCardProps) => {
  return (
    <div className="p-md bg-white shadow-md rounded-md text-center transition-shadow hover:shadow-lg">
      <h3 className="text-body font-semibold text-text">{title}</h3>
    </div>
  )
}

export default CategoryCard
