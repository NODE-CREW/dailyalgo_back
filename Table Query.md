# Table Query

## user

- ID
- 이름
- 닉네임
- 이메일

```mysql
CREATE TABLE IF NOT EXISTS user (
	id VARCHAR(20) NOT NULL COMMENT 'ID (PK)',
    name VARCHAR(20) NOT NULL COMMENT '이름',
    nickname VARCHAR(20) NOT NULL COMMENT '별명',
    email VARCHAR(50) NOT NULL COMMENT '이메일',
    PRIMARY KEY (id)
) COMMENT '유저'
```



## password

> 보안을 위해 비밀번호를 따로 관리도 가능

- User ID
- salt
- stretching
- 비밀번호
  - renewed (메일로 임시 비밀번호를 보내 비밀번호 초기화 후 변경을 강제할 때 필요)

```mysql
CREATE TABLE IF NOT EXISTS password (
	user_id VARCHAR(20) NOT NULL COMMENT 'USER ID (PK)',
    salt VARCHAR(10) NOT NULL COMMENT 'salt',
    stretching INT NOT NULL COMMENT 'stretching',
    password VARCHAR(255) NOT NULL COMMENT '비밀번호',
    PRIMARY KEY (user_id)
) COMMENT '비밀번호'
```



## question

- ID
- 제목
- 작성자
- 출처 - 어떤 식으로 관리할지 (구분값을 따로 만들지, 도메인주소를 적을지에 따라 다름)
- 질문유형
- 코드
- 질문내용
- 생성시간
- 수정시간

```mysql
CREATE TABLE IF NOT EXISTS question (
	id INT NOT NULL AUTO_INCREMENT COMMENT 'ID (PK)',
    title VARCHAR(100) NOT NULL COMMENT '제목',
    writer VARCHAR(20) NOT NULL COMMENT '작성자',
    source VARCHAR(50) NOT NULL COMMENT '출처',
    type VARCHAR(2) NOT NULL COMMENT '질문 유형',
    code VARCHAR(3000) NULL COMMENT '코드',
    content VARCHAR(3000) NOT NULL COMMENT '내용',
    created_time DATETIME NOT NULL DEFAULT NOW() COMMENT '생성시간',
    modified_time DATETIME NULL COMMENT '수정시간',
    PRIMARY KEY (id)
) COMMENT '질문'
```



### question_info

- Question ID
- 조회 수
- 좋아요 수
- 답변 수
- 댓글 수
- 마지막 답변 id

```mysql
CREATE TABLE IF NOT EXISTS question_info (
	question_id INT NOT NULL COMMENT 'Question ID (PK)',
    view_cnt INT NOT NULL DEFAULT 0 COMMENT '조회 수',
    like_cnt INT NOT NULL DEFAULT 0 COMMENT '좋아요 수',
    answer_cnt INT NOT NULL DEFAULT 0 COMMENT '답변 수',
    comment_cnt INT NOT NULL DEFAULT 0 COMMENT '댓글 수',
	last_answer_id INT NULL COMMENT 'Answer ID (PK)',
    PRIMARY KEY (question_id)
) COMMENT '질문 정보'
```



## answer

- ID
- Question ID
- User ID
- 답변내용
- 생성시간
- 수정시간

```mysql
CREATE TABLE IF NOT EXISTS answer (
	id INT NOT NULL AUTO_INCREMENT COMMENT 'ID (PK)',
	question_id INT NOT NULL COMMENT 'Question ID',
	user_id VARCHAR(20) NOT NULL COMMENT 'User ID',
    content VARCHAR(3000) NOT NULL COMMENT '내용',
    created_time DATETIME NOT NULL DEFAULT NOW() COMMENT '생성시간',
    modified_time DATETIME NULL COMMENT '수정시간',
    PRIMARY KEY (id)
) COMMENT '답변'
```



### answer_info

- Answer ID
- 좋아요 수

```mysql
CREATE TABLE IF NOT EXISTS answer_info (
	answer_id INT NOT NULL COMMENT 'Answer ID (PK)',
    like_cnt INT NOT NULL DEFAULT 0 COMMENT '좋아요 수',
    PRIMARY KEY (answer_id)	
) COMMENT '답변 정보'
```



## question_comment

- ID
- Question ID
- User ID

- 내용
- 생성시간
- 수정시간

```mysql
CREATE TABLE IF NOT EXISTS question_comment (
	id INT NOT NULL AUTO_INCREMENT COMMENT 'ID (PK)',
	question_id INT NOT NULL COMMENT 'Question ID',
	user_id VARCHAR(20) NOT NULL COMMENT 'User ID',
    content VARCHAR(200) NOT NULL COMMENT '내용',
    created_time DATETIME NOT NULL DEFAULT NOW() COMMENT '생성시간',
    modified_time DATETIME NULL COMMENT '수정시간',
    PRIMARY KEY (id)
) COMMENT '질문 댓글'
```



### question_comment_info

- Comment ID
- 좋아요 수

```mysql
CREATE TABLE IF NOT EXISTS question_comment_info (
	question_comment_id INT NOT NULL COMMENT 'Question Comment ID (PK)',
    like_cnt INT NOT NULL DEFAULT 0 COMMENT '좋아요 수',
    PRIMARY KEY (question_comment_id)	
) COMMENT '질문 댓글 정보'
```



## answer_comment

- ID
- AnswerID
- User ID

- 내용
- 생성시간
- 수정시간

```mysql
CREATE TABLE IF NOT EXISTS answer_comment (
	id INT NOT NULL AUTO_INCREMENT COMMENT 'ID (PK)',
	question_id INT NOT NULL COMMENT 'Answer ID',
	user_id VARCHAR(20) NOT NULL COMMENT 'User ID',
    content VARCHAR(200) NOT NULL COMMENT '내용',
    created_time DATETIME NOT NULL DEFAULT NOW() COMMENT '생성시간',
    modified_time DATETIME NULL COMMENT '수정시간',
    PRIMARY KEY (id)
) COMMENT '답변 댓글'
```



### answer_comment_info

- Comment ID
- 좋아요 수

```mysql
CREATE TABLE IF NOT EXISTS answer_comment_info (
	answer_comment_id INT NOT NULL COMMENT 'Answer Comment ID (PK)',
    like_cnt INT NOT NULL DEFAULT 0 COMMENT '좋아요 수',
    PRIMARY KEY (answer_comment_id)	
) COMMENT '답변 댓글 정보'
```
