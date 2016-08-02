module Main exposing (..)

import Html.App exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import List exposing (..)


main : Program Never
main =
    Html.App.beginnerProgram { model = model, view = view, update = update }


model : Model
model =
    { subHeaderLinks =
        [ ( "mailto:willisplummer@gmail.com", "email me" )
        , ( "https://github.com/willisplummer", "github" )
        , ( "https://twitter.com/willisplummer", "twitter" )
        , ( "https://www.linkedin.com/in/willisplummer", "linkedin" )
        ]
    , bio = "Willis is a poet"
    , nav =
        [ ( "About", About )
        , ( "Writing", Writing )
        , ( "Portfolio", Portfolio )
        , ( "Contact", Contact )
        ]
    }


type alias Model =
    { subHeaderLinks : List ( String, String )
    , bio : String
    , nav : List ( String, Msg )
    }


type Msg
    = About
    | Writing
    | Portfolio
    | Contact


update : Msg -> Model -> Model
update msg model =
    case msg of
        About ->
            { model | bio = "ABOUT PAGE" }

        Writing ->
            { model | bio = "WRITING PAGE" }

        Portfolio ->
            { model | bio = "PORTFOLIO PAGE" }

        Contact ->
            { model | bio = "CONTACT PAGE" }


view : Model -> Html Msg
view model =
    div [ class "main" ]
        [ div [ class "header" ]
            [ h1 [] [ text "Willis Plummer" ]
            , nav model
            ]
        , subHeader model
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
    div [ class "content" ] [ text model.bio ]
