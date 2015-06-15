-- 회원정보2
DROP TABLE userinfo;

-- 클라우드계정
DROP TABLE cloudinfo;

-- 회원정보2
CREATE TABLE userinfo (
  email VARCHAR(40)  NOT NULL, 
  pwd   VARCHAR(255) NOT NULL, 
  name  VARCHAR(50)  NULL,     
  tel   VARCHAR(30)  NULL      
);

-- 회원정보2 기본키
CREATE UNIQUE INDEX PK_userinfo
  ON userinfo ( 
    email ASC 
  );

-- 회원정보2
ALTER TABLE userinfo
  ADD
    CONSTRAINT PK_userinfo 
    PRIMARY KEY (
      email 
    );


-- 클라우드계정
CREATE TABLE cloudinfo (
  email     VARCHAR(40)  NOT NULL, 
  cloudtype VARCHAR(50)  NOT NULL, 
  cloudid   VARCHAR(40)  NOT NULL, 
  token     VARCHAR(255) NULL,     
  active    VARCHAR(1)   NULL      
);

-- 클라우드계정 기본키
CREATE UNIQUE INDEX PK_cloudinfo
  ON cloudinfo ( 
    email     ASC, 
    cloudtype ASC, 
    cloudid   ASC  
  );

-- 클라우드계정
ALTER TABLE cloudinfo
  ADD
    CONSTRAINT PK_cloudinfo 
    PRIMARY KEY (
      email,     
      cloudtype, 
      cloudid    
    );


-- 클라우드계정
ALTER TABLE cloudinfo
  ADD
    CONSTRAINT FK_userInfo_TO_cloudinfo 
    FOREIGN KEY (
      email 
    )
    REFERENCES userinfo ( 
      email 
    );

