function Pagination({ page, setPage, totalPages }) {

    return (

        <div className="flex justify-center items-center gap-2 mt-8">

            <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="border px-4 py-2 rounded disabled:opacity-50"
            >
                Previous
            </button>

            {
                [...Array(totalPages)].map((_, index) => {

                    const pageNumber = index + 1;

                    return (

                        <button
                            key={pageNumber}
                            onClick={() => setPage(pageNumber)}
                            className={`px-4 py-2 rounded border ${
                                page === pageNumber
                                    ? "bg-black text-white"
                                    : ""
                            }`}
                        >
                            {pageNumber}
                        </button>

                    );

                })
            }

            <button
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
                className="border px-4 py-2 rounded disabled:opacity-50"
            >
                Next
            </button>

        </div>

    );

}

export default Pagination;