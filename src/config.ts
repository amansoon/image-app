import { createApi } from "unsplash-js";
// import type {Basic} from 'unsplash-js/src/methods/photos/types'


export const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_API_KEY as string,
  headers: {
     'Authorization': 'Bearer x1JkXyf3fYReR0L59pvnulzpdAEVbaZx_Uz3AlM_2Tk'
  }
});

