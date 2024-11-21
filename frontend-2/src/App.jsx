import { Box, Button, Text, Title } from '@mantine/core';
import { CustomLayout } from '@/Layouts'; // Possible because of the index.js file in Layouts
import { useStyles } from './Styles/appStyles';


function App() {
  const { classes } = useStyles();  // Destructuring the classes object from the custom useStyles hook

  return (
    <CustomLayout>
      <Box>
        <Title className={classes.title}>Hello, Mantine!</Title>
        <Text>Click the button below to get started.</Text>
        <Button mt={10} variant="outline">Get started</Button>
      </Box>
    </CustomLayout>
  );
}

export default App;
