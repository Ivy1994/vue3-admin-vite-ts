import { MockMethod } from "vite-plugin-mock";
import { Random,mock } from "mockjs";
console.log();

const successCode = 200;
const hasNotToken = 401;
const hasNotPermission = 403;
const successMsg = "操作成功"
const reutnData = (token,data) =>{
  if(token) {
    return {
      code:successCode,
      message:successMsg,
      data
    }
  } else {
    return {
      code:hasNotToken,
      message:"未登录",
      data:{}
    }
  }
}
export default [
  {
    url: "/api/user/info",
    method: "get",
    response: req => {
      let permissions:string[] = [];
      if(req.headers["access_token"].includes("admin")) {
        permissions.push("admin")
      } else {
        permissions.push("user")
      }
      return reutnData("1231232123",{
        username: "我不爱吃鱼鱼鱼鱼",
        permissions,
        email: Random.email(),
        avater: Random.image("64x64", "red", "yuyuyu"),
      })
    },
  },
  {
    url: "/api/user/login",
    method: "post",
    response: req => {
      console.log(req.body);
      let token:string = ""
      if(req.body["username"].includes("admin")) {
        token ="admin_123ashdkhaskjdhk"
        } else {
          token = "user_kdhakjsoib234oisd2480asd.asdas214asd"
        }
      return {
        code: 200,
        data: {
          token,
        },
      };
    },
  },
  {
    url: "/api/post",
    method: "post",
    timeout: 2000,
    response: {
      code: 0,
      data: {
        name: "vben",
      },
    },
  },
  {
    url:"/api/baseTable",
    method:"get",
    response:(req)=>{
      let {pageSize,currentPage} = req.query;
      return {
        code:0,
        messgae:"ok",
        data:mock({
          "total":400,
          [`list|${pageSize}`]:[
            {
              "name":"@word",
              "date":"@date",
              "sex|1":[0,1,2],
              "positon|1":["厨师长","学妹","loler","程序媛","程序猿"],
              "ins":"@csentence",
              "email":"@email",
              "domain":"@domain"
            }
          ]
        })
      }
    }
  },
  {
    url: "/api/text",
    method: "post",
    rawResponse: async (req, res) => {
      let reqbody = "";
      await new Promise(resolve => {
        req.on("data", chunk => {
          reqbody += chunk;
        });
        req.on("end", () => resolve(undefined));
      });
      res.setHeader("Content-Type", "text/plain");
      res.statusCode = 200;
      res.end(`hello, ${reqbody}`);
    },
  },
] as MockMethod[];
