const mongoose = require('mongoose');
const { Schema} = mongoose;

const Author = new Schema({
    name: String,
    email: String,
});

const Book = new Schema({
    title: String,
    authors: [Author], //위에서 만든 Author 스키마를 가진 객체들의 배열형태로 설정했습니다.
    publishedDate: Date,
    price: Number,
    tags: [String], // 배열형태
    createdAt: {    // 기본 값 설정할 때는 객체로
        type: Date,
        default: Date.now// 
    }
});

// Book이지만 db에서는 books로 만들어짐 (복수형태)
module.exports = mongoose.model('Book', Book);
