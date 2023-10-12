import Grid from '@mui/material/Grid';
import AddQuestion from './Question';

function AddQuestionAndSample(){

    return <div>
        <Grid container spacing={1}>
          <Grid item xl={7} lg={7} md={7} sm={12} xs={12}>
            <AddQuestion></AddQuestion>
          </Grid>
          <Grid item xl={5} lg={5} md={5} sm={12} xs={12} >
                <div>lorem10</div>
          </Grid>
        </Grid>
    </div>
};

export default AddQuestionAndSample;