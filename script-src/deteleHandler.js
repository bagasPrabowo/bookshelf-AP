const { nanoid } = require('nanoid');
const books = require('./books');

const deleteBookByIdHandler = (request, h) => {
    const { bookId } = request.params;

    const place = books.findIndex((book) => book.id === bookId);
    if (place !== -1) {
        books.splice(place, 1);
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil dihapus',
        });
        response.code(200);
        return response;
    }
    const response = h.response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};

module.exports = { deleteBookByIdHandler };
