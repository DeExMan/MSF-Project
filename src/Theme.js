import { createTheme } from "@mui/material";
import { color, fontSize } from "@mui/system";


const theme = createTheme({
    palette: {
        success: {
            main: "#1DB970",
            color: "#C2C2C2",
            fontFamily: 'Arial',
        },
        secondary: {
            main: "#3B414E",
            color: "#C2C2C2"
        },
        error: {
            main: "#9A473C"
        },
        priamary: {
          main: "#1D8AB9"
        }
    },
    typography: {
        fontFamily: 'Arial',
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: 24,
        lineHeight: "28px",
        color: "#C2C2C2"
    },
    components: {
        // Name of the component
        MuiTextField: {
          styleOverrides: {
            // Name of the slot

            
            root: {
              // Some CSS
              '& label.Mui-focused': {
                borderRadius: "10px",
              },
              '& .MuiInput-underline:after': {
                borderRadius: "10px",
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderRadius: "10px",
                },
                '&:hover fieldset': {
                  borderColor: 'black',
                  borderRadius: "10px",
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'rgba(204, 209, 221, 1)',
                  borderRadius: "10px",
                }
              },
              
              backgroundColor: "#3B414E",
              boxShadow: "0px 0px 20px 10px rgba(0, 0, 0, 0.15)",
              borderRadius: "10px",
              color: "white",
              
            },
            input: {
              color:"white",
            },
            text: {
              color:"white",
            },
          },
        },
        MuiAlert:{
          styleOverrides: {
            root: {
            }
          }
        },
        MuiDialog: {
          styleOverrides: {
            // Name of the slot
            container:{
                
            },
            root: {
              '& label.Mui-focused': {
                borderRadius: "10px",
              },
              '& .MuiDialog-underline:after': {
                borderRadius: "10px",
              },
              '& .MuiOutlinedDialog-root': {
                '& fieldset': {
                  borderRadius: "10px",
                },
                '&:hover fieldset': {
                  borderColor: 'black',
                  borderRadius: "10px",
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'rgba(204, 209, 221, 1)',
                  borderRadius: "10px",
                }
              },
              // Some CSS
                main: "black",
                background:"rgba(0, 0, 0, 0.6)"
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            // Name of the slot
            
            root: {
              fontFamily: 'Arial',
              color: "white",
              boxShadow: "0px 0px 20px 10px rgba(0, 0, 0, 0.15)",
              borderRadius: "10px",
              
            },
            
            
            
          },
        },
        MuiInputBase: {
          styleOverrides: {
            root: {
              '& .MuiInputBase-input': {
                borderRadius: "10px",
                
                '&:focus': {
                  borderRadius: 4,
                  borderColor: 'black',
                  boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
                  
                },
                '&:focused': {
                  borderColor: "black"
                }
                
              },
              '&.MuiSelect-select MuiSelect-outlined MuiOutlinedInput-input MuiInputBase-input MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input': {
                borderColor: 'rgba(204, 209, 221, 1)',
                borderRadius: "10px",
              },
              
            color: "white",
            boxShadow: "0px 0px 20px 10px rgba(0, 0, 0, 0.15)",
            borderRadius: "10px",
            },
          },
        },
        MuiFormControl: {
          styleOverrides: {
            // Name of the slot

            
            root: {
              '& .MuiFormControl-root': {
                '& fieldset': {
                  borderRadius: "10px",
                },
                '&:hover fieldset': {
                  borderColor: 'black',
                  borderRadius: "10px",
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'rgba(204, 209, 221, 1)',
                  borderRadius: "10px",
                }
              },
            }
          }
        },
        MuiOutlinedInput: {
          root: {
            '&.MuiFormControl-root MuiFormControl-root': {
              borderColor: 'rgba(204, 209, 221, 1)',
              borderRadius: "10px",

          }
        }
        },
        MuiSelect: {
          root: {
            '&:before': {
                  borderColor: "white",
              },
              '&:after': {
                  borderColor: "white",
              }
          }
        },
        select: {
          '&:before': {
              borderColor: 'white',
          },
          '&:after': {
              borderColor: 'white',
          },
          '&:not(.Mui-disabled):hover::before': {
              borderColor: 'white',
          },
      },
        
        // MuiDialog: {
        //   styleOverrides: {
        //     // Name of the slot
        //     root: {
        //       // Some CSS
        //      color: "black",
        //     },
        //   }
        // }
        
    },
     
});

export default theme;