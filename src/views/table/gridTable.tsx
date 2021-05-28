import { defineComponent, ref } from "vue";
import testTree from "./test/tree";
import dayjs from "dayjs";
const gridTable = defineComponent({
  name: "gridTable",
  components: {
    testTree,
  },
  setup() {
    const activeName = ref("first_1");
    const active = ref(1);
    const changeActive = (index: number): void => {
      active.value = index;
    };
    const getTimeLimit = (endTime: string): number => {
      const now = dayjs();
      const end = dayjs(endTime);
      return end.diff(now, "seconds");
    };
    // let interVal: any;
    // const doTask = () => {
    //   setTimeout(() => {
    //     interVal = setInterval(() => {
    //       const jiaoben = fetch("https://uranus.jd.com/log/m?std=MO-J2011-1", {
    //         headers: {
    //           accept: "*/*",
    //           "accept-language": "zh-CN,zh;q=0.9",
    //           "content-type": "text/plain",
    //           "sec-ch-ua":
    //             '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"',
    //           "sec-ch-ua-mobile": "?0",
    //           "sec-fetch-dest": "empty",
    //           "sec-fetch-mode": "cors",
    //           "sec-fetch-site": "same-site",
    //         },
    //         referrer: "https://prodev.m.jd.com/",
    //         referrerPolicy: "strict-origin-when-cross-origin",
    //         body:
    //           '{"pin_sid":"","report_ts":"1622163421513","scr":"1366x768","token":"099179f21d72228b0dd29ea5bb3381b4","ut":"s","clt":"web","jvr":"3.0.5","std":"MO-J2011-1","tpc":"traffic-jdm.cl","uuid":"1019529162","cli":"M-M","biz":"mba","mba_muid":"1019529162","mba_sid":"1622163050784844709852454639","proj_id":"3","reserved3":"122270672.1019529162.1618881516.1622109068.1622162969.5_76161171_baidu_-_organic_not set_1622109067609_122270672.32.1019529162_5.1622162969_1019529162_122270672.32.1019529162_5.1622162969___V2_ZzNtbUVVSkFwWBEHe0oJUGJRRl9KBUIRfV1DBisaCAJjBRIKclRCFnUUR1BnGlwUZwIZWUdcQhxFCEdkexhdB2cLEV1BUnMlRQtGZHopXARnCxZeSldEFkU4Rlx/KVwEZgAXWUdVSxVzD0NUS0wMWT9tEG1HV0IUdg9EUXwebARXAiIcLFBFFnMIRhl7GFwNYwAaXUVUcxRFCw==","osp":"mac","data":[{"ref":"https://huishou.m.jd.com/","ctm":"1622163421517","pin":"jd_79015d551999b","pid":"ab4FwAbMnaOQF4QvlOhIxbV9-x-f3wj7","ctp":"https://prodev.m.jd.com/mall/active/3Vf8UrbtwQk976QEjPq2bgtQsfDv/index.html","par":"{\\"pageId\\":\\"2644514\\",\\"cv\\":\\"2.0\\"}","usc":"baidu","umd":"organic","utr":"not set","ucp":"-","jdv":"76161171|baidu|-|organic|not set|1622109067609","vts":5,"seq":32,"browser_ver":"90.0.4430.212","browser":"Chrome","fst":1618881516,"pst":1622109068,"vct":1622162969,"clr":"24-bit","bsl":"zh-cn","bsc":"UTF-8","jav":0,"flv":"","tit":"高价回收","hash":"","tad":"1","dataver":"0.1","is_wq":"2","chan_type":7,"typ":"cl","lgt":"cl","tar":"","mba_seq":"24","event_id":"Babel_H5FirstClick","event_param":"{\\"aid\\":\\"00316825\\",\\"pageId\\":\\"2644514\\",\\"mid\\":\\"56475022\\"}","page_name":"https://prodev.m.jd.com/mall/active/3Vf8UrbtwQk976QEjPq2bgtQsfDv/index.html","page_param":"2644514","event_level":"","unpl":"V2_ZzNtbUVVSkFwWBEHe0oJUGJRRl9KBUIRfV1DBisaCAJjBRIKclRCFnUUR1BnGlwUZwIZWUdcQhxFCEdkexhdB2cLEV1BUnMlRQtGZHopXARnCxZeSldEFkU4Rlx/KVwEZgAXWUdVSxVzD0NUS0wMWT9tEG1HV0IUdg9EUXwebARXAiIcLFBFFnMIRhl7GFwNYwAaXUVUcxRFCw==","mjds":""}]}',
    //         method: "POST",
    //         mode: "cors",
    //         credentials: "omit",
    //       });
    //     }, 50);
    //     setTimeout(() => {
    //       clearInterval(interVal);
    //     }, 60000);
    //   }, getTimeLimit("2021-05-28 09:59:58") * 1000);
    // };
    // doTask();
    return () => (
      <div>
        <div
          class="w-full h-24  flex items-end "
          style="background-color:#3c00ca"
        >
          <span class="inline-block bander-item"></span>
          <span
            onClick={changeActive.bind(this, 1)}
            class={
              "inline-block w-1/6 h-1/2  bander-item" +
              (active.value === 1 ? " is-active" : "")
            }
          >
            子项
          </span>
          <span
            onClick={changeActive.bind(this, 2)}
            class={
              "inline-block w-1/6 h-1/2  bander-item" +
              (active.value === 2 ? " is-active" : "")
            }
          >
            子项
          </span>
          <span
            onClick={changeActive.bind(this, 3)}
            class={
              "inline-block w-1/6 h-1/2  bander-item" +
              (active.value === 3 ? " is-active" : "")
            }
          >
            子项
          </span>
          <span
            onClick={changeActive.bind(this, 4)}
            class={
              "inline-block w-1/6 h-1/2  bander-item" +
              (active.value === 4 ? " is-active" : "")
            }
          >
            子项
          </span>
          <span
            onClick={changeActive.bind(this, 5)}
            class={
              "inline-block w-1/6 h-1/2  bander-item" +
              (active.value === 5 ? " is-active" : "")
            }
          >
            子项
          </span>
          <span class="inline-block bander-item "></span>
        </div>
      </div>
    );
  },
});
export default gridTable;
