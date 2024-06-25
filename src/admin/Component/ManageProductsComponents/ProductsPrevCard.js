import ProductCard from './PreComponents/ProductCard'
import Loading from '../../../Common/Components/Loading'
function ProductsPrevCard({products, isLoading, error}) {
    return (
        <>
            <div className="flex flex-col gap-2 overflow-y-auto ">
                {/* Filter buttons */}
                <div className="themeGlassBg rounded-xl p-4 themeText">

                    <button
                        // key={role}
                        className="flex focus:outline-none bg-orange-700 dark:bg-orange-400 themeText
                     focus:ring-2 focus:ring-orange-300 font-medium rounded-lg px-5 py-2.5 cursor-pointer dark:focus:ring-yellow-900"
                    >
                        BTN
                    </button>

                </div>


            <div className="themeGlassBg h-[65vh] rounded-xl p-4 themeText flex flex-col gap-2 overflow-y-auto">
          
                {isLoading ? (
            <Loading />
        ) : error ? (
            <p>Error loading users. Please try again later.</p>
        ) : products.length === 0 ? (
            <p>No users found .</p>
        ) : (
            <div className="themeGlassBg rounded-xl p-4 themeText flex flex-wrap content-start gap-2 h-full overflow-y-auto md:grid grid-cols-2 xl:grid-cols-3">
                     <ProductCard products={products}/>
            </div>
        )}
            </div>

        </div >
  </>
  )
}

export default ProductsPrevCard