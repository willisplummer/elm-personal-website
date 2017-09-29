module Main exposing (..)

import Html exposing (..)
import Html.Attributes exposing (class, href, style, type_)
import Html.Attributes.A11y exposing (pressed)
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
        , subscriptions = \_ -> Sub.none
        }


type alias Model =
    { nav : List ( String, Msg, Route )
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
        [ ( "About", ShowAbout, AboutRoute )
        , ( "Writing", ShowWriting, WritingRoute )
        , ( "Projects", ShowPortfolio, PortfolioRoute )
        , ( "Contact", ShowContact, ContactRoute )
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
    [ ( "https://gumroad.com/l/okoyomon_plummer2017", "Wild Horse Rappers ebook w/ precious okoyomon (ghost city press)" )
    , ( "http://muumuuhouse.com/wp.22may2017.html", "10,000 Year Clock (muumuu house)" )
    , ( "http://www.bodegamag.com/articles/172-bros", "bros (bodega mag)" )
    , ( "http://darkfuckingwizard.com/three-poems/", "3 poems (dark fucking wizard)" )
    , ( "http://muumuuhouse.com/wp.13nov2014.html", "14 haiku (muumuu house)" )
    , ( "https://preludemag.com/contributors/willis-plummer/", "3 poems (prelude magazine)" )
    , ( "http://cwp.fas.nyu.edu/object/cwp.ug.lobelprize_plummer", "good and beautiful (nyu creative writing program)" )
    , ( "http://www.hobartpulp.com/web_features/5-poems--8", "5 poems (hobartpulp)" )
    ]


prose : List ( String, String )
prose =
    [ ( "https://thecreativeindependent.com/people/tao-lin-on-why-he-writes/", "tao lin on why he writes (the creative independent)" )
    , ( "https://thecreativeindependent.com/people/precious-okoyomon-on-finding-poetry-in-everything/", "precious okoyomon on finding poetry in everything (the creative independent)" )
    , ( "https://medium.com/kickstarter/total-party-kill-3898fb82b5fb#.31wxy6hzl", "total party kill: the architects of dungeons and dragons (kickstarter blog)" )
    , ( "http://thoughtcatalog.com/2013/not-even-doom-music-an-interview-with-mat-riviere/", "not even doom music: an interview with mat riviere (thought catalog)" )
    , ( "http://thoughtcatalog.com/2013/an-interview-with-nytyrant-in-four-parts/", "an interview with giancarlo ditrapano (thought catalog)" )
    , ( "http://thoughtcatalog.com/2012/my-tweets-almost-got-me-sent-home-from-study-abroad/", "my tweets almost got me sent home from study abroad (thought catalog)" )
    ]


misc : List ( String, String )
misc =
    [ ( "http://westernbeefs.com", "Western Beefs of North America (editor)" )
    , ( "http://dadsofshutterstock.tumblr.com", "dads of shutterstock" )
    , ( "http://twitter.com/willisdepressed", "@willisdepressed" )
    , ( "http://twitter.com/willisunedited", "@willisunedited" )
    , ( "http://muumuuhouse.com/wp.twitter1.2012.html", "selections from willis plummer's twitter (edited by mira gonzalez)" )
    , ( "http://muumuuhouse.com/vt.twitter.2012-13.html", "selections from victoria trott's twitter (edited by willis plummer)" )
    ]


projects : List Project
projects =
    [ { title = "This Portfolio Site"
      , description = """
                        This single-page portfolio site was built using Elm.
                        It implements the Navigation and URLparser packages to handle routing.
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
            ( { model | route = currentRoute }, Cmd.none )



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



-- Views


view : Model -> Html Msg
view model =
    body
        [ mainStyle ]
        [ header [ class "header", headerStyle ]
            [ h1 [ h1Style ] [ text "Willis Plummer" ]
            , headerNav model
            ]
        , content model
        ]


headerNav : Model -> Html Msg
headerNav model =
    let
        navItemStyle =
            \bool ->
                if bool then
                    activeButtonStyle
                else
                    buttonStyle
    in
    nav []
        (List.intersperse (text " | ")
            (List.concatMap (\( description, msg, route ) -> [ button [ type_ "button", onClick msg, pressed <| Just (model.route == route), navItemStyle (model.route == route) ] [ text description ] ]) model.nav)
        )


content : Model -> Html Msg
content model =
    case model.route of
        AboutRoute ->
            div [ class "content", contentStyle ]
                [ p [] [ text "Hi, I'm Willis" ]
                , p [] [ text "I'm a software engineer and sometimes poet living in Brooklyn" ]
                , p [] [ text "I work at Kickstarter" ]
                ]

        WritingRoute ->
            div [ class "content", contentStyle ]
                [ p [] [ text "Poetry:" ]
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

        PortfolioRoute ->
            div [ class "content", contentStyle ]
                (List.concatMap
                    showProject
                    model.projectDescriptions
                )

        ContactRoute ->
            div [ class "content", contentStyle ]
                [ p []
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

        NotFoundRoute ->
            div [ class "content", contentStyle ] [ text "NOT FOUND" ]


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
        , ( "margin", "auto" )
        , ( "width", "90%" )
        , ( "max-width", "450px" )
        ]


activeButtonStyle : Attribute msg
activeButtonStyle =
    style
        [ ( "width", "15%" )
        , ( "min-width", "55px" )
        , ( "border-color", "black" )
        , ( "background-color", "black" )
        , ( "color", "white" )
        , ( "border-radius", "5px" )
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
