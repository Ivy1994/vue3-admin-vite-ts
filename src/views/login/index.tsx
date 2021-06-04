import { UserLoginForm } from "@apis/models/user";
import { defineComponent, reactive, ref } from "vue";
import { useUserStore } from "@store/user";
import { useRouter } from "vue-router";
const login = defineComponent({
  setup (prop,ctx) {
    const userStore = useUserStore()    
    //@ts-ignore
    const loginForm = ref<any>({} as ElFormItemCont)
    const loginFromRules = reactive({
      username:[
        {required:true,message:"请输入账号",trigger:"blur"}
      ],
      password:[
        {required:true,message:"请输入密码",trigger:"blur"}
      ]
    })
    const submitForm = reactive({
      username:'',
      password:"",
      isRemenber:false,
    } as UserLoginForm)
    const router = useRouter()

    const buttonLoading = ref(false)
    const submitAction = () =>{
      loginForm.value.validate(val =>{
        if(val) {
          buttonLoading.value = true;
          userStore.userLogin(submitForm).then(async ()=>{
            buttonLoading.value = false
            await userStore.userInfo()
            router.push("/")            
          }).catch(err =>{
            buttonLoading.value =false
          })
        }
      })
    }
    const userPreIcon = {
      prefix:function(){return <i class="el-icon-user"></i>}
    };
    const userPwdPreIcon = {
      prefix:function(){return <i class="el-icon-unlock"></i>}
    };
    return () => <div class="flex justify-center overflow-hidden items-center xl:justify-evenly md:flex-row-reverse mr-auto w-screen h-screen">
      <div style="z-index:9999" class=" backdrop-blur-md bg-transparent w-10/12 h-1/2 md:w-1/2 md:h-3/5 xl:w-96 xl:h-auto xl:mr-80 lg:w-1/2 lg:h-4/6 shadow-xl rounded-3xl">
        <div class="subpixel-antialiased mt-10 md:mt-2 md:p-8 md:pb-2 font-sans text-2xl text-center md:text-left p-4 text-gray-700 hover:scale-100">登录</div>
        <div class="w-full p-4 mt-10 md:mt-2.5 md:p-8">
          <el-form ref={loginForm} rules={loginFromRules} model={submitForm}>
            <el-form-item size="medium" prop="username">
              <el-input type="text" size="medium" class="login-input" vModel={submitForm.username} vSlots={userPreIcon} />
            </el-form-item >
            <el-form-item size="medium" prop="password">
              <el-input type="password"  size="medium" class="login-input" vModel={submitForm.password} vSlots={userPwdPreIcon}/>
            </el-form-item>
          </el-form>
          <div class="w-full flex flex-row">
            <div class="w-1/2 text-left"><el-checkbox vModel={submitForm.isRemenber}>记住密码</el-checkbox></div>
            <div class="text-gray-400 cursor-pointer hover:text-red-300 w-1/2 text-right">忘记密码?</div>
          </div>
          <div class="w-full mt-2 text-center">
            <z-button onClick={submitAction} loading = {buttonLoading.value} type="success">submit</z-button>
             </div>
        </div>
      </div>
      <css-doodle use="var(--rule)"></css-doodle>
    </div>; 
  }
})

export default login