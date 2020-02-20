export default {
      palette: {
            primary: {
                  light: "#8133f1",
                  main: "#6200EE",
                  dark: "#4400a6",
                  contrastText: "#fff"
            },
            secondary: {
                  light: "#35e1d1",
                  main: "#03dac6",
                  dark: "#02988a",
                  contrastText: "#fff"
            }
      },
      spread: {
            typography: {
                  useNextVariants: true
            },
            form: {
                  textAlign: "center"
            },
            image: {
                  margin: "20px auto 20px auto",
                  width: "200px"
            },
            pageTitle: {
                  margin: "10px auto 10px auto"
            },
            textField: {
                  margin: "10px auto 10px auto"
            },
            button: {
                  marginTop: "20px",
                  position: "relative" // set to allow spinner a position of absolute
            },
            customError: {
                  color: "red",
                  fontSize: "0.8 rem",
                  marginTop: "10px"
            },
            progress: {
                  position: "absolute"
            },
            paper: {
                  padding: 20
            },
            profile: {
                  "& .image-wrapper": {
                        textAlign: "center",
                        position: "relative",
                        "& button": {
                              position: "absolute",
                              top: "80%",
                              left: "70%"
                        }
                  },
                  "& .profile-image": {
                        width: 200,
                        height: 200,
                        objectFit: "cover",
                        maxWidth: "100%",
                        borderRadius: "50%"
                  },
                  "& .profile-details": {
                        textAlign: "center",
                        "& span, svg": {
                              verticalAlign: "middle"
                        },
                        "& a": {
                              color: "#00bcd4"
                        }
                  },
                  "& hr": {
                        border: "none",
                        margin: "0 0 10px 0"
                  },
                  "& svg.button": {
                        "&:hover": {
                              cursor: "pointer"
                        }
                  }
            },
            buttons: {
                  textAlign: "center",
                  "& a": {
                        margin: "20px 10px"
                  }
            },
            invisibleSeperator: {
                  border: "none",
                  margin: 4
            },
            visibleSeperator: {
                  width: "100%",
                  borderBottom: "1px solid rgba(0,0,0,0.1)",
                  marginBottom: 15,
                  marginTop: 20
            },
            card: {
                  display: "flex",
                  marginBottom: 20
            },
            cardContent: {
                  width: "100%",
                  flexDirection: "column",
                  padding: 25
            },
            cover: {
                  minWidth: 200,
                  objectFit: "cover"
            },
            handle: {
                  width: 60,
                  height: 18,
                  backgroundColor: "#6200EE",
                  marginBottom: 7
            },
            date: {
                  width: 100,
                  height: 14,
                  marginBottom: 10,
                  backgroundColor: "rgba(0,0,0,0.3)"
            },
            fullLine: {
                  height: 15,
                  width: "90%",
                  marginBottom: 10,
                  backgroundColor: "rgba(0,0,0,0.6)"
            },
            halfLine: {
                  height: 15,
                  width: "50%",
                  marginBottom: 10,
                  backgroundColor: "rgba(0,0,0,0.6)"
            }
      }
};
