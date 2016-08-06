module Main exposing (..)

import Html.App exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import List exposing (..)
import Navigation exposing (..)
import Routing exposing (..)


--main : Program Never
--main =
--    Html.App.beginnerProgram { model = model, view = view, update = update }


main : Program Never
main =
    Navigation.program Routing.parser
        { init = init
        , view = view
        , update = update
        , urlUpdate = urlUpdate
        , subscriptions = subscriptions
        }



-- Data


init : Result String Route -> ( Model, Cmd Msg )
init result =
    let
        currentRoute =
            Routing.routeFromResult result
    in
        ( initialModel currentRoute, Cmd.none )


initialModel : Routing.Route -> Model
initialModel route =
    { subHeaderLinks =
        [ ( "mailto:willisplummer@gmail.com", "email me" )
        , ( "https://github.com/willisplummer", "github" )
        , ( "https://twitter.com/willisplummer", "twitter" )
        , ( "https://www.linkedin.com/in/willisplummer", "linkedin" )
        ]
    , nav =
        [ ( "About", ShowAbout )
        , ( "Writing", ShowWriting )
        , ( "Portfolio", ShowPortfolio )
        , ( "Contact", ShowContact )
        ]
    , writingLinks =
        { poetryLinks = poetry
        , proseLinks = prose
        , miscLinks = misc
        }
    , route = route
    }


poetry : List ( String, String )
poetry =
    [ ( "http://www.bodegamag.com/articles/172-bros", "bros (bodega mag)" )
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


type alias Model =
    { subHeaderLinks : List ( String, String )
    , nav : List ( String, Msg )
    , writingLinks : Links
    , route : Routing.Route
    }


type alias Links =
    { poetryLinks : List ( String, String )
    , proseLinks : List ( String, String )
    , miscLinks : List ( String, String )
    }



-- Update


type Msg
    = ShowAbout
    | ShowWriting
    | ShowPortfolio
    | ShowContact


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



-- View


view : Model -> Html Msg
view model =
    div [ class "main" ]
        [ div [ class "header" ]
            [ h1 [] [ text "Willis Plummer Personal Webpage" ]
            , nav model
            ]
        , br [] []
        , content model
        ]


nav : Model -> Html Msg
nav model =
    div []
        (List.intersperse (text " | ")
            (List.concatMap (\( description, msg ) -> [ button [ type' "button", onClick msg ] [ text description ] ]) model.nav)
        )


subHeader : Model -> Html Msg
subHeader model =
    div [ class "subheader" ]
        (List.intersperse (text " | ")
            (List.concatMap (\( url, description ) -> [ a [ href url ] [ text description ] ]) model.subHeaderLinks)
        )


content : Model -> Html Msg
content model =
    case model.route of
        AboutRoute ->
            div [ class "content" ]
                [ p [] [ text "Hi, I'm Willis" ]
                , p [] [ text "I'm a poet and a web developer" ]
                ]

        WritingRoute ->
            div [ class "content" ]
                [ p [] [ text "You can find some of my writing online:" ]
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

        PortfolioRoute ->
            div [ class "content" ]
                [ p [] [ text "Here are some things I've built:" ]
                , div [ class "project" ]
                    [ h2 [] [ text "This Personal Website" ]
                    , p []
                        [ text "I wrote this website in Elm ("
                        , a [ href "https://github.com/willisplummer/elm-personal-website" ]
                            [ text "github" ]
                        , text ")"
                        ]
                    ]
                , div [ class "project" ]
                    [ h2 [] [ text "MTA Bus Times" ]
                    , p []
                        [ text "A ruby application to check when the next bus is coming from your Amazon Echo. ("
                        , a [ href "https://github.com/willisplummer/mta_alexa_app" ]
                            [ text "github" ]
                        , text ")"
                        ]
                    ]
                , div [ class "project" ]
                    [ h2 [] [ text "Western Beefs of North America" ]
                    , p []
                        [ text "A Rails CMS for the poetry and prose site that I edited. ("
                        , a [ href "westernbeefs.com" ]
                            [ text "link" ]
                        , text ") ("
                        , a [ href "https://github.com/willisplummer/elm-personal-website" ]
                            [ text "github" ]
                        , text ")"
                        ]
                    ]
                ]

        ContactRoute ->
            div [ class "content" ]
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
            div [ class "content" ] [ text "NOT FOUND" ]



-- urlUpdate


urlUpdate : Result String Route -> Model -> ( Model, Cmd Msg )
urlUpdate result model =
    let
        currentRoute =
            Routing.routeFromResult result
    in
        ( { model | route = currentRoute }, Cmd.none )



-- Subscriptions


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none
