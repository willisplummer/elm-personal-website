port module Main exposing (..)

import Navigation
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import List exposing (..)
import Navigation
import UrlParser exposing (..)


-- Main


main : Program Never Model Msg
main =
    Navigation.program UrlChange
        { init = init
        , view = view
        , update = update
        , subscriptions = (\_ -> Sub.none)
        }


type alias Model =
    { nav : List ( String, Msg )
    , writingLinks : Links
    , projectDescriptions : List Project
    , route : Route
    }


type alias Links =
    { poetryLinks : List ( String, String )
    , proseLinks : List ( String, String )
    , miscLinks : List ( String, String )
    }


type alias Project =
    { title : String
    , description : String
    , links : List ( String, String )
    }


parseUrl : Navigation.Location -> Route
parseUrl location =
    let
        parsedURL =
            UrlParser.parseHash route location
    in
        Maybe.withDefault NotFoundRoute parsedURL


init : Navigation.Location -> ( Model, Cmd Msg )
init location =
    ( initialModel (parseUrl location)
    , Cmd.none
    )


initialModel : Route -> Model
initialModel route =
    { nav =
        [ ( "About", ShowAbout )
        , ( "Writing", ShowWriting )
        , ( "Projects", ShowPortfolio )
        , ( "Contact", ShowContact )
        ]
    , writingLinks =
        { poetryLinks = poetry
        , proseLinks = prose
        , miscLinks = misc
        }
    , projectDescriptions = projects
    , route = route
    }


poetry : List ( String, String )
poetry =
    [ ( "http://muumuuhouse.com/wp.22may2017.html", "10,000 Year Clock" )
    , ( "http://www.bodegamag.com/articles/172-bros", "bros (bodega mag)" )
    , ( "http://darkfuckingwizard.com/three-poems/", "3 poems (dark fucking wizard)" )
    , ( "http://muumuuhouse.com/wp.13nov2014.html", "14 haiku (muumuu house)" )
    , ( "https://preludemag.com/contributors/willis-plummer/", "3 poems (prelude magazine)" )
    , ( "http://cwp.fas.nyu.edu/object/cwp.ug.lobelprize_plummer", "good and beautiful (nyu creative writing program)" )
    , ( "http://www.hobartpulp.com/web_features/5-poems--8", "5 poems (hobartpulp)" )
    ]


prose : List ( String, String )
prose =
    [ ( "https://medium.com/kickstarter/total-party-kill-3898fb82b5fb#.31wxy6hzl", "total party kill: the architects of dungeons and dragons" )
    , ( "http://thoughtcatalog.com/2013/not-even-doom-music-an-interview-with-mat-riviere/", "not even doom music: an interview with mat riviere" )
    , ( "http://thoughtcatalog.com/2013/an-interview-with-nytyrant-in-four-parts/", "an interview with giancarlo ditrapano" )
    , ( "http://thoughtcatalog.com/2012/my-tweets-almost-got-me-sent-home-from-study-abroad/", "my tweets almost got me sent home from study abroad" )
    ]


misc : List ( String, String )
misc =
    [ ( "http://dadsofshutterstock.tumblr.com", "dads of shutterstock" )
    , ( "http://twitter.com/willisunedited", "@willisunedited" )
    , ( "http://twitter.com/willisdepressed", "@willisdepressed" )
    , ( "http://muumuuhouse.com/wp.twitter1.2012.html", "selections from willis plummer's twitter (edited by mira gonzalez)" )
    , ( "http://muumuuhouse.com/vt.twitter.2012-13.html", "selections from victoria trott's twitter (edited by willis plummer)" )
    ]


projects : List Project
projects =
    [ { title = "This Portfolio Site"
      , description = """
                        This single-page portfolio site was built using Elm.
                        It implements the Navigation and URLparser packages to handle routing
                        and uses a port for JavaScript scrolling.
                        """
      , links = [ ( "https://github.com/willisplummer/elm-personal-website", "github" ) ]
      }
    , { title = "MTA Bus Times App for Amazon Echo"
      , description = """
                        This ruby app runs on Sinatra and enables the Amazon Echo to
                        let you know when the next bus will arrive via the MTA's Bus Time API.
                        """
      , links = [ ( "https://github.com/willisplummer/mta_alexa_app", "github" ) ]
      }
    , { title = "Western Beefs of North America"
      , description = """
                        This is a poetry and prose website that I edited in 2014 and 2015.
                        I built a Rails CMS to simplify the process of adding new content.
                        """
      , links = [ ( "http://westernbeefs.com/", "site" ), ( "https://github.com/willisplummer/westernbeefs", "github" ) ]
      }
    ]



-- Update


type Msg
    = ShowAbout
    | ShowWriting
    | ShowPortfolio
    | ShowContact
    | UrlChange Navigation.Location


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        ShowAbout ->
            ( model, Navigation.modifyUrl "#about" )

        ShowWriting ->
            ( model, Navigation.modifyUrl "#writing" )

        ShowPortfolio ->
            ( model, Navigation.modifyUrl "#portfolio" )

        ShowContact ->
            ( model, Navigation.modifyUrl "#contact" )

        UrlChange location ->
            let
                currentRoute =
                    parseUrl location
            in
                ( { model | route = currentRoute }, scroll (routeToString currentRoute) )



-- ROUTING


type Route
    = AboutRoute
    | WritingRoute
    | PortfolioRoute
    | ContactRoute
    | NotFoundRoute


route : Parser (Route -> a) a
route =
    UrlParser.oneOf
        [ UrlParser.map AboutRoute top
        , UrlParser.map AboutRoute (UrlParser.s "about")
        , UrlParser.map WritingRoute (UrlParser.s "writing")
        , UrlParser.map PortfolioRoute (UrlParser.s "projects")
        , UrlParser.map PortfolioRoute (UrlParser.s "portfolio")
        , UrlParser.map ContactRoute (UrlParser.s "contact")
        ]

routeToString : Route -> String
routeToString route =
    case route of
        AboutRoute ->
            "about"
        WritingRoute ->
            "writing"
        PortfolioRoute ->
            "projects"
        ContactRoute ->
            "contact"
        NotFoundRoute ->
            "header"
    
-- Ports

port scroll : String -> Cmd msg    

-- Views


view : Model -> Html Msg
view model =
    body
        [ mainStyle ]
        [ div [ class "header", id "header", headerStyle ]
            [ h1 [ h1Style ] [ text "Willis Plummer" ]
            , nav model
            ]
        , content model
        ]


nav : Model -> Html Msg
nav model =
    div []
        (List.intersperse (text " | ")
            (List.concatMap (\( description, msg ) -> [ button [ type_ "button", onClick msg, buttonStyle ] [ text description ] ]) model.nav)
        )


content : Model -> Html Msg
content model =
    div [] 
        [ div [ class "content", id "about", contentStyle ]
            [ h2 [] [ text "About Me" ]
            , p [] [ text "Hi, I'm Willis" ]
            , p [] [ text "I'm a software engineer and sometimes poet living in Brooklyn" ]
            , p [] [ text "I work at Kickstarter" ]
            ]
        , div [ class "content", id "writing", contentStyle ]
            [ h2 [] [ text "Writing" ]
            , p [] [ text "Poetry:" ]
            , ul [ class "writing-list" ]
                (List.concatMap
                    (\( url, description ) -> [ li [] [ a [ href url ] [ text description ] ] ])
                    model.writingLinks.poetryLinks
                )
            , p [] [ text "Prose:" ]
            , ul [ class "writing-list" ]
                (List.concatMap
                    (\( url, description ) -> [ li [] [ a [ href url ] [ text description ] ] ])
                    model.writingLinks.proseLinks
                )
            , p [] [ text "Misc:" ]
            , ul [ class "writing-list" ]
                (List.concatMap
                    (\( url, description ) -> [ li [] [ a [ href url ] [ text description ] ] ])
                    model.writingLinks.miscLinks
                )
            ]
        , div [ class "content", id "projects", contentStyle ]
                [ h2 [] [ text "Projects" ]
                , div [] 
                    (List.concatMap
                        showProject
                        model.projectDescriptions
                        )
                ]
        , div [ class "content", id "contact", contentStyle ]
            [ h2 [] [ text "Contact" ]
            , p []
                [ text "You can find me on "
                , a [ href "https://github.com/willisplummer" ] [ text "Github" ]
                , text " and "
                , a [ href "https://twitter.com/willisplummer" ] [ text "Twitter" ]
                ]
            , p []
                [ text "I'm also on "
                , a [ href "https://www.linkedin.com/in/willisplummer" ] [ text "LinkedIn" ]
                , text " and "
                , a [ href "https://willisplummer.tumblr.com" ] [ text "Tumblr" ]
                ]
            , p []
                [ a [ href "mailto:willisplummer@gmail.com" ] [ text "Email" ]
                , text " is the best way to get in touch"
                ]
            ]
        ]
            
-- TODO: Handle NotFoundRoute
        -- NotFoundRoute ->
        --     div [ class "content", contentStyle ] [ text "NOT FOUND" ]


showProject : Project -> List (Html Msg)
showProject project =
    [ div [ class "project", projectStyle ]
        [ div [ class "project-content", projectContentStyle ]
            [ h2 [ h2Style ]
                [ text project.title ]
            , p []
                [ text project.description ]
            , p []
                (List.concatMap
                    (\( url, description ) -> [ text "(", a [ href url ] [ text description ], text ")" ])
                    project.links
                )
            ]
        ]
    ]


mainStyle : Attribute msg
mainStyle =
    style
        [ ( "margin", "auto" )
        , ( "width", "80%" )
        , ( "height", "100%" )
        , ( "min-width", "380px" )
        , ( "max-width", "625px" )
        , ( "background-color", "white" )
        ]


headerStyle : Attribute msg
headerStyle =
    style
        [ ( "text-align", "center" )
        , ( "margin", "20px" )
        ]


contentStyle : Attribute msg
contentStyle =
    style
        [ ( "text-align", "left" )
        , ( "margin", "100px auto" )
        , ( "width", "90%" )
        , ( "max-width", "450px" )
        ]


buttonStyle : Attribute msg
buttonStyle =
    style
        [ ( "width", "15%" )
        , ( "min-width", "55px" )
        , ( "border-color", "black" )
        , ( "background-color", "white" )
        , ( "border-radius", "5px" )
        ]


projectStyle : Attribute msg
projectStyle =
    style
        [ ( "padding", "15px 3% 2px 3%" )
        , ( "margin", "10px 0%" )
        , ( "border-radius", "10px" )
        , ( "border", "0px invisible black" )
        , ( "background-color", "#E4FEFF" )
        ]


projectContentStyle : Attribute msg
projectContentStyle =
    style
        [ ( "padding", "0 1.5%" )
        , ( "text-align", "left" )
        ]


h2Style : Attribute msg
h2Style =
    style
        [ ( "padding", "0%" )
        , ( "margin", "0%" )
        , ( "font-size", "110%" )
        ]


h1Style : Attribute msg
h1Style =
    style
        [ ( "padding", "0%" )
        , ( "margin", "15px" )
        ]
