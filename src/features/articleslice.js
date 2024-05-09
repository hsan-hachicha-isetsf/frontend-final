import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import {fetcharticles,addarticle,deletearticle,editarticle,fetcharticleById,updateQte} from
"../services/articleservice"
export const getArticles = createAsyncThunk(
"article/getArticles",
async (_, thunkAPI) => {
const { rejectWithValue } = thunkAPI;
try {
const res = await fetcharticles();
return res.data;
}
catch (error) {
return rejectWithValue(error.message);
}
}
);
export const createArticle = createAsyncThunk(
"article/createArticle",
async (article, thunkAPI) => {
const { rejectWithValue } = thunkAPI;
try{
const res= await addarticle(article);
return res.data
}
catch (error) {
return rejectWithValue(error.message);
} }
);
export const delArticle = createAsyncThunk(
"article/delArticle",
async (id,thunkAPI) => {
const { rejectWithValue } = thunkAPI;
try{
await deletearticle(id);
return id ;
}
catch (error) {
return rejectWithValue(error.message);
}
});
export const updateArticle = createAsyncThunk(
"article/updateArticle",
async (article, thunkAPI) => {
const { rejectWithValue } = thunkAPI;
try{
const res= await editarticle(article);
return res.data
}
catch (error) {
return rejectWithValue(error.message);
} }
);

export const updateArticleQte = createAsyncThunk(
    "article/updateArticleqtestock",
    async (art, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try{
        console.log("id est",art._id)
        console.log("quantité stock est",art.qtestock)
    const res= await updateQte(art);
    return res.data
    }
    catch (error) {
    return rejectWithValue(error.message);
    } }
    );

export const findArticleByID = createAsyncThunk(
"article/findArticleByID",
async (id,thunkAPI) => {
const { rejectWithValue } = thunkAPI;
try{
const res = await fetcharticleById(id);
return res.data;
}
catch (error) {
return rejectWithValue(error.message);
}
});
export const articleSlice = createSlice({
name: 'article',
initialState:{
articles:[],
article:{},
isLoading: false,
success:null,
error:null,
},
extraReducers: (builder) => {
//get articles
builder
.addCase(getArticles.pending, (state, action) => {
state.isLoading=true;
state.error=null;
})
.addCase(getArticles.fulfilled, (state, action) => {
state.isLoading=false;
state.error = null;
state.articles=action.payload;
})
.addCase(getArticles.rejected, (state, action) => {
state.isLoading=false;
state.error=action.payload;
console.log("impossible de se connecter au serveur")
})
//insertion article
.addCase(createArticle.pending, (state, action) => {
state.isLoading=true;
state.error=null;
state.success=null;
})
.addCase(createArticle.fulfilled, (state, action) => {
state.articles.push(action.payload);
state.isLoading=false;
state.error=null;
state.success=action.payload;
})
.addCase(createArticle.rejected, (state, action) => {
state.isLoading=false;
state.error=action.payload;
state.success=null;
})
//Modification article
.addCase(updateArticle.pending, (state, action) => {
state.isLoading=true;
state.error=null;
state.success=null;
})
.addCase(updateArticle.fulfilled, (state, action) => {
state.articles = state.articles.map((item) =>
item._id === action.payload._id ? action.payload : item
);
state.isLoading=false;
state.error=null;
state.success=action.payload;
})


//update qtestock
.addCase(updateArticleQte.fulfilled, (state, action) => {
    state.articles = state.articles.map((item) =>
    item._id === action.payload._id ? action.payload : item
    );
    state.isLoading=false;
    state.error=null;
    state.success=action.payload;
    })
//Delete article
.addCase(delArticle.pending, (state, action) => {
state.isLoading=true;
state.error=null;
})
.addCase(delArticle.fulfilled, (state, action) => {
state.isLoading=false;
state.error=null;
state.articles=state.articles.filter((item)=> item._id!==action.payload)
})
.addCase(delArticle.rejected, (state, action) => { 
    console.log(action.payload)
state.isLoading=false;
state.error=action.payload;
})
//Fectch article
.addCase(findArticleByID.pending, (state, action) => {
state.isLoading = true
state.error=null;
})
.addCase(findArticleByID.fulfilled,(state, action) => {
    state.isLoading = false
    state.error = null
    state.article=action.payload;
    })
    } }
    )
    export default articleSlice.reducer;