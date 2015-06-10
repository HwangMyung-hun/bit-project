-- 회원정보2
DROP TABLE "MY_SCHEMA"."userInfo";

-- 클라우드계정
DROP TABLE "MY_SCHEMA"."cloudinfo";

-- 회원정보2
CREATE TABLE "MY_SCHEMA"."userInfo" (
  "email" VARCHAR(40)  NOT NULL, -- 이메일
  "pwd"   VARCHAR(255) NOT NULL, -- 비밀번호
  "name"  VARCHAR(50)  NULL,     -- 이름
  "tel"   VARCHAR(30)  NULL      -- 전화번호
);

-- 회원정보2 기본키
CREATE UNIQUE INDEX "MY_SCHEMA"."PK_userInfo"
  ON "MY_SCHEMA"."userInfo" ( -- 회원정보2
    "email" ASC -- 이메일
  );

-- 회원정보2
ALTER TABLE "MY_SCHEMA"."userInfo"
  ADD
    CONSTRAINT "PK_userInfo" -- 회원정보2 기본키
    PRIMARY KEY (
      "email" -- 이메일
    );

-- 회원정보2
COMMENT ON TABLE "MY_SCHEMA"."userInfo" IS '회원정보2';

-- 이메일
COMMENT ON COLUMN "MY_SCHEMA"."userInfo"."email" IS '이메일';

-- 비밀번호
COMMENT ON COLUMN "MY_SCHEMA"."userInfo"."pwd" IS '비밀번호';

-- 이름
COMMENT ON COLUMN "MY_SCHEMA"."userInfo"."name" IS '이름';

-- 전화번호
COMMENT ON COLUMN "MY_SCHEMA"."userInfo"."tel" IS '전화번호';

-- 회원정보2 기본키
COMMENT ON INDEX "MY_SCHEMA"."PK_userInfo" IS '회원정보2 기본키';

-- 회원정보2 기본키
COMMENT ON CONSTRAINT "MY_SCHEMA"."userInfo"."PK_userInfo" IS '회원정보2 기본키';

-- 클라우드계정
CREATE TABLE "MY_SCHEMA"."cloudinfo" (
  "email"     VARCHAR(40)  NOT NULL, -- 이메일
  "cloudtype" VARCHAR(50)  NOT NULL, -- 클라우드종류
  "cloudid"   VARCHAR(40)  NOT NULL, -- 아이디
  "token"     VARCHAR(255) NULL,     -- 토큰
  "active"    VARCHAR(1)   NULL      -- 활성화
);

-- 클라우드계정 기본키
CREATE UNIQUE INDEX "MY_SCHEMA"."PK_cloudinfo"
  ON "MY_SCHEMA"."cloudinfo" ( -- 클라우드계정
    "email"     ASC, -- 이메일
    "cloudtype" ASC, -- 클라우드종류
    "cloudid"   ASC  -- 아이디
  );

-- 클라우드계정
ALTER TABLE "MY_SCHEMA"."cloudinfo"
  ADD
    CONSTRAINT "PK_cloudinfo" -- 클라우드계정 기본키
    PRIMARY KEY (
      "email",     -- 이메일
      "cloudtype", -- 클라우드종류
      "cloudid"    -- 아이디
    );

-- 클라우드계정
COMMENT ON TABLE "MY_SCHEMA"."cloudinfo" IS '클라우드계정';

-- 이메일
COMMENT ON COLUMN "MY_SCHEMA"."cloudinfo"."email" IS '이메일';

-- 클라우드종류
COMMENT ON COLUMN "MY_SCHEMA"."cloudinfo"."cloudtype" IS '클라우드종류';

-- 아이디
COMMENT ON COLUMN "MY_SCHEMA"."cloudinfo"."cloudid" IS '아이디';

-- 토큰
COMMENT ON COLUMN "MY_SCHEMA"."cloudinfo"."token" IS '토큰';

-- 활성화
COMMENT ON COLUMN "MY_SCHEMA"."cloudinfo"."active" IS '활성화';

-- 클라우드계정 기본키
COMMENT ON INDEX "MY_SCHEMA"."PK_cloudinfo" IS '클라우드계정 기본키';

-- 클라우드계정 기본키
COMMENT ON CONSTRAINT "MY_SCHEMA"."cloudinfo"."PK_cloudinfo" IS '클라우드계정 기본키';

-- 클라우드계정
ALTER TABLE "MY_SCHEMA"."cloudinfo"
  ADD
    CONSTRAINT "FK_userInfo_TO_cloudinfo" -- 회원정보 -> 클라우드계정
    FOREIGN KEY (
      "email" -- 이메일
    )
    REFERENCES "MY_SCHEMA"."userInfo" ( -- 회원정보2
      "email" -- 이메일
    );

-- 회원정보 -> 클라우드계정
COMMENT ON CONSTRAINT "MY_SCHEMA"."cloudinfo"."FK_userInfo_TO_cloudinfo" IS '회원정보 -> 클라우드계정';