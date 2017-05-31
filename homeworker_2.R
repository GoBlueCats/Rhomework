library(shiny)

library(ggplot2)
library(gdata)

library(DBI)
library(RPostgreSQL)

drv <- dbDriver("PostgreSQL") 



drv <- dbDriver("PostgreSQL") 
con <- dbConnect(drv, host="localhost", port=5432, dbname="zth", user="tianzhang", password="") 
pts <- dbGetQuery(con, "SELECT * FROM patientinfo")
ptm <- dbGetQuery(con, "SELECT * FROM patientexpression")


final <- merge(pts,ptm,by="id")



age11 <- final[final$age<40,c("sub1","age")]
hit11 <- qplot(sub1,data=age11,geom = "histogram",binwidth = 0.5, xlab = "Sub1", ylab="frequency", main="Sub1 under age 40")
age12 <- final[final$age<40,c("oxr1","age")]
hit12 <- qplot(oxr1,data=age12,geom = "histogram",binwidth = 0.5, xlab = "Oxr1", ylab="frequency", main="Oxr1 under age 40")
age13 <- final[final$age<40,c("sod1","age")]
hit13 <- qplot(sod1,data=age13,geom = "histogram",binwidth = 0.5, xlab = "Sod1", ylab="frequency", main="Sod1 under age 40")

age21 <- final[final$age>=40,c("sub1","age")]
hit21 <- qplot(sub1,data=age21,geom = "histogram",binwidth = 0.5, xlab = "Sub1", ylab="frequency", main="Sub1 over age 40")
age22 <- final[final$age>=40,c("oxr1","age")]
hit22 <- qplot(oxr1,data=age22,geom = "histogram",binwidth = 0.5, xlab = "Oxr1", ylab="frequency", main="Oxr1 over age 40")
age23 <- final[final$age>=40,c("sod1","age")]
hit23 <- qplot(sod1,data=age23,geom = "histogram",binwidth = 0.5, xlab = "Sod1", ylab="frequency", main="Sod1 over age 40")


library(gridExtra)



ui <- fluidPage(
  actionButton(inputId = "small", label = "age under 40"),
  actionButton(inputId = "large", label = "age bigger than 40"),
  plotOutput("hist")  
)

server <- function(input,output){
    a = hit11
    b = hit12
    c = hit13
    
    rv <- reactiveValues(a = hit11,b=hit12,c=hit13)
    observeEvent(input$small, { rv$a <- hit11 ;rv$b <- hit12; rv$c <- hit13 })
    observeEvent(input$large, { rv$a <- hit21 ;rv$b <- hit22; rv$c <- hit23 })
    
    output$hist <- renderPlot({
      grid.arrange(rv$a,rv$b,rv$c,nrow=3)
    })

}

shinyApp(ui=ui,server=server)