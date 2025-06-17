function getPageToShow(page, totalPages) {
    let pageToShow = [];
    if (totalPages <= 3) {
        for (let i = 1; i <= totalPages; i++) {
            pageToShow.push(i);
        }
    } else {
        if (page <= 2) {
            pageToShow = [1, 2, 3];
        } else if (page >= totalPages - 1) {
            pageToShow = [totalPages - 2, totalPages - 1, totalPages];
        } else {
            pageToShow = [page - 1, page, page + 1];
        }
    }
    return pageToShow;
}

module.exports = getPageToShow;
