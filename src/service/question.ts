import { Base } from './base'
import { PoolOptions } from 'mysql2'
import getConfig from '../config/config'
import question_info from './question_info'

export type QuestionType = {
  id: number
  title: string
  user_id: string
  source: string
  type: number
  content: string
  code: string
  created_time: Date
  modified_time?: Date
}

type QuestionCreationType = {
  id?: number
  title: string
  user_id: string
  source: string
  type: number
  content: string
  code: string
}

type QuestionListType = {
  title: string
  view_cnt: number
  like_cnt: number
  answer_cnt: number
  comment_cnt: number
  last_answer_id?: string
}

type QuestionDetailType = {
  id: number
  title: string
  user_id: string
  source: string
  type: number
  content: string
  code: string
  created_time: Date
  modified_time?: Date
  view_cnt: number
  like_cnt: number
  answer_cnt: number
  comment_cnt: number
}

export class Question extends Base {
  constructor(options: PoolOptions) {
    super(options)
  }

  async find(id: number): Promise<QuestionDetailType> {
    question_info.view(id)
    const sql = 'SELECT q.*, qi.* FROM question q INNER JOIN question_info qi ON q.id = qi.question_id WHERE id = :id'
    const row = await this._find(sql, { id })
    return {
      id: row['id'],
      title: row['title'],
      user_id: row['user_id'],
      source: row['source'],
      type: row['type'],
      content: row['content'],
      code: row['code'],
      created_time: row['created_time'],
      modified_time: row['modified_time'],
      view_cnt: row['view_cnt'],
      like_cnt: row['like_cnt'],
      answer_cnt: row['answer_cnt'],
      comment_cnt: row['comment_cnt'],
    }
  }

  async findList(
    offset: number,
  ): Promise<QuestionListType[]> {
    const limit = 10
    const sql = 'SELECT q.title, qi.view_cnt, qi.like_cnt, qi.answer_cnt, qi.comment_cnt, qi.last_answer_id FROM question q INNER JOIN question_info qi ON q.id = qi.question_id WHERE  ORDERS LIMIT :limit OFFSET :offset'
    const rows = await this._findListPage(sql, { offset, limit })

    if (rows.length == 0) {
      throw new Error('NOT_FOUND')
    }

    return rows
  }

  async create(question: QuestionCreationType): Promise<void> {
    const created_time = Date.now();
    const sql =
      'INSERT INTO question (title, user_id, source, type, content, code, created_time) VALUES (:title, :user_id, :source, :type, :content, :code, :created_time)'
    const question_id = await this._create(sql, {
      title: question.title,
      user_id: question.user_id,
      source: question.source,
      type: question.type,
      content: question.content,
      code: question.code,
      created_time,
    })
    question_info.create(Number(question_id))
  }

  async update(question: QuestionCreationType): Promise<void> {
    if (!question.id) return

    const modified_time = Date.now();
    const sql =
      'UPDATE question SET title = :title, source = :source, type = :type, content = :content, code = :code, modified_time = :modified_time WHERE id = :id'
    await this._update(sql, {
      title: question.title,
      source: question.source,
      type: question.type,
      content: question.content,
      modified_time,
      id: question.id,
    })
  }

  async delete(id: number): Promise<void> {
    const sql =
      'DELETE FROM question WHERE id = :id'
    await this._delete(sql, {
      id,
    })
  }
}

export default new Question(getConfig().db)