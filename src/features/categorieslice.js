import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import{fetchcategories,addcategorie,deletecategorie,editcategorie,fetchcategorieById} from "../services/categorieservice"

export const getCategories = createAsyncThunk(
"categorie/getCategories",
async (_, thunkAPI) => {
const { rejectWithValue } = thunkAPI;
try {
const res = await fetchcategories();
return res.data;
}
catch (error) {
return rejectWithValue(error.message);
}
}
);
export const createCategorie = createAsyncThunk(
"categorie/createCategorie",
async (Categories, thunkAPI) => {
const { rejectWithValue } = thunkAPI;
try{
const res= await addcategorie(Categories);
return res.data
}
catch (error) {
return rejectWithValue(error.message);



}
}
);
export const deleteCategorie = createAsyncThunk(
"categorie/deleteCategorie",
async (id,thunkAPI) => {
const { rejectWithValue } = thunkAPI;
try{
await deletecategorie(id);
return id ;
}
catch (error) {
return rejectWithValue(error.message);
}
});
export const updateCategorie = createAsyncThunk(
"categorie/updateCategorie",
async (Categories, thunkAPI) => {
const { rejectWithValue } = thunkAPI;
try{
const res= await editcategorie(Categories);
return res.data
}
catch (error) {
return rejectWithValue(error.message);
}
}
);
export const findCategorieByID = createAsyncThunk(
"categorie/findCategorieByID",
async (id,thunkAPI) => {
const { rejectWithValue } = thunkAPI;
try{
const res = await fetchcategorieById(id);
return res.data;
}
catch (error) {
return rejectWithValue(error.message);
}
});
export const categorieslice = createSlice({
name: 'categorie',
initialState:{
categories:[],


categorie:{},
isLoading: false,
success:null,
error:null,
},

extraReducers: (builder) => {
//get Categories
builder
.addCase(getCategories.pending, (state, action) => {
state.isLoading=true;
state.error=null;
})
.addCase(getCategories.fulfilled, (state, action) => {
state.isLoading=false;
state.error = null;
state.categories=action.payload;
})
.addCase(getCategories.rejected, (state, action) => {
state.isLoading=false;
state.error=action.payload;
console.log("impossible de se connecter au serveur")
})
//insertion Categories
.addCase(createCategorie.pending, (state, action) => {
state.isLoading=true;
state.error=null;
state.success=null;
})
.addCase(createCategorie.fulfilled, (state, action) => {
state.categories.push(action.payload);
state.isLoading=false;
state.error=null;
state.success=action.payload;
})
.addCase(createCategorie.rejected, (state, action) => {
state.isLoading=false;
state.error=action.payload;
state.success=null;
})
//Modification Categories
.addCase(updateCategorie.pending, (state, action) => {
state.isLoading=true;
state.error=null;
state.success=null;



})
.addCase(updateCategorie.fulfilled, (state, action) => {
state.categories = state.categories.map((item) =>
item._id === action.payload._id ? action.payload : item
);
state.isLoading=false;
state.error=null;
state.success=action.payload;
})
//Delete Categories
.addCase(deleteCategorie.pending, (state, action) => {
state.isLoading=true;
state.error=null;
})
.addCase(deleteCategorie.fulfilled, (state, action) => {
state.isLoading=false;
state.error=null;
state.categories=state.categories.filter((item)=>
item._id!==action.payload)
})
.addCase(deleteCategorie.rejected, (state, action) => {
state.isLoading=false;
state.error=action.payload;
})
//Fectch Categories
.addCase(findCategorieByID.pending, (state, action) => {
state.isLoading = true
state.error=null;
})
.addCase(
findCategorieByID.fulfilled,(state, action) => {
state.isLoading = false
state.error = null
state.categories=action.payload;
})
}
}
)

export default categorieslice.reducer;