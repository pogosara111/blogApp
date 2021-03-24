import {ChangeEvent} from "react";
import {setPageItemCountAC} from "../../bll/reducers/commonReducer";
import {useDispatch} from "react-redux";

export const Pagination = ({pageItemCount, totalPosts, paginate, currentPage}: any) => {

    const dispatch = useDispatch()

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / pageItemCount); i++) {
        pageNumbers.push(i);
    }

    const onChangePageItemCount = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch(setPageItemCountAC(Number(e.currentTarget.value)))
    }

    return (
        <div>
            <div className='pagination'>
                {pageNumbers.map(number => (
                    <div onClick={() => paginate(number)} key={number} className={'page-item'}>
                        <span  className={currentPage === number ? 'page-link' : ""}>
                            {number}
                        </span>
                    </div>
                ))}
            </div>
            <div>
                <span>
                    <select onChange={onChangePageItemCount} value={pageItemCount}>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                    </select>
                </span>
            </div>
        </div>
    );
};

