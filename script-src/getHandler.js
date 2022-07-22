const { nanoid } = require('nanoid');
const books = require('./books');

const getAllBooksHandler = (request, h) => {
    const { reading, finished, name } = request.query;
    const queryRead = reading && (reading === "1");
    const queryFinish = finished && (finished === "1");
    const filteredBooks = [...books].filter((book) => {
        let isRead = queryRead === undefined ? true : (queryRead === book.reading);
        let isFinished = queryFinish === undefined ? true : (queryFinish === book.finished);
        let isNamed = name === undefined ? true : (book.name.toLowerCase().includes(name.toLowerCase()))
        return isRead && isFinished && isNamed;
    });
    const response = h.response({
        status: 'success',
        data: {
            books: filteredBooks.map((book) => ({
                id: book.id,
                name: book.name,
                publisher: book.publisher,
            })),
        },
    });
    response.code(200);
    return response;
};

const getBookByIdHandler = (request, h) => {
    const { bookId } = request.params;
    const book = [...books].filter((b) => b.id === bookId)[0];
    if (book !== undefined) {
        return {
            status: 'success',
            data: {
                book,
            },
        };
    }
    const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;
};

module.exports = { getAllBooksHandler, getBookByIdHandler }