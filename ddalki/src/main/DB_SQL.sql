-- 회원정보2
DROP TABLE "MY_SCHEMA"."userInfo";

-- 클라우드계정
DROP TABLE "MY_SCHEMA"."cloudinfo";

-- 회원정보2
CREATE TABLE "MY_SCHEMA"."userInfo" (
  "email" VARCHAR(40)  NOT NULL, 
  "pwd"   VARCHAR(255) NOT NULL, 
  "name"  VARCHAR(50)  NULL,     
  "tel"   VARCHAR(30)  NULL      
);

-- 회원정보2 기본키
CREATE UNIQUE INDEX "MY_SCHEMA"."PK_userInfo"
  ON "MY_SCHEMA"."userInfo" ( 
    "email" ASC 
  );

-- 회원정보2
ALTER TABLE "MY_SCHEMA"."userInfo"
  ADD
    CONSTRAINT "PK_userInfo" 
    PRIMARY KEY (
      "email" 
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
  "email"     VARCHAR(40)  NOT NULL, 
  "cloudtype" VARCHAR(50)  NOT NULL, 
  "cloudid"   VARCHAR(40)  NOT NULL, 
  "token"     VARCHAR(255) NULL,     
  "active"    VARCHAR(1)   NULL      
);

-- 클라우드계정 기본키
CREATE UNIQUE INDEX "MY_SCHEMA"."PK_cloudinfo"
  ON "MY_SCHEMA"."cloudinfo" ( 
    "email"     ASC, 
    "cloudtype" ASC, 
    "cloudid"   ASC  
  );

-- 클라우드계정
ALTER TABLE "MY_SCHEMA"."cloudinfo"
  ADD
    CONSTRAINT "PK_cloudinfo" 
    PRIMARY KEY (
      "email",     
      "cloudtype", 
      "cloudid"    
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
    CONSTRAINT "FK_userInfo_TO_cloudinfo" 
    FOREIGN KEY (
      "email" 
    )
    REFERENCES "MY_SCHEMA"."userInfo" ( 
      "email" 
    );

-- 회원정보 -> 클라우드계정
COMMENT ON CONSTRAINT "MY_SCHEMA"."cloudinfo"."FK_userInfo_TO_cloudinfo" IS '회원정보 -> 클라우드계정';