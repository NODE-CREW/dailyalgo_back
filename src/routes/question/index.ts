import express from 'express'
import {
  deleteQuestion,
  deleteQuestionComment,
  findQuestion,
  findQuestionCommentList,
  findQuestionList,
  insertQuestion,
  insertQuestionComment,
  likeQuestion,
  updateQuestion,
  updateQuestionComment,
} from '../../controller/question'
import check_token from '../../middleware/check_token'

const router = express.Router()

// Todo : Compare User 쪽 Middleware 잘못 만듦 (수정 필요!)

router.post('/', check_token, insertQuestion)
router.get('/', findQuestionList)
router.get('/:id', findQuestion)
router.put('/:id', check_token, updateQuestion)
router.delete('/:id', check_token, deleteQuestion)
router.put('/:id/like', check_token, likeQuestion)
router.get('/:id/comment', findQuestionCommentList) // 댓글 조회
router.post('/:id/comment', check_token, insertQuestionComment) // 댓글 작성
router.put('/:id/comment', check_token, updateQuestionComment) // 댓글 수정
router.delete('/:id/comment', check_token, deleteQuestionComment) // 댓글 삭제

export default router
