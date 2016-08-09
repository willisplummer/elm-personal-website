module Views exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Messages exposing (..)
import Models exposing (..)
import Routing exposing (..)


view : Model -> Html Msg
view model =
    div
        [ class "main", mainStyle ]
        [ div [ class "header", headerStyle ]
            [ h1 [] [ text "Willis Plummer Web Presence" ]
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


content : Model -> Html Msg
content model =
    case model.route of
        AboutRoute ->
            div [ class "content", contentStyle ]
                [ p [] [ text "Hi, I'm Willis" ]
                , p [] [ text "I'm a poet and a web developer" ]
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
                [ div [ class "project" ]
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


mainStyle : Attribute msg
mainStyle =
    style
        [ ( "margin", "auto" )
        , ( "width", "40%" )
        ]


headerStyle : Attribute msg
headerStyle =
    style
        [ ( "text-align", "center" )
        ]


contentStyle : Attribute msg
contentStyle =
    style
        [ ( "text-align", "left" )
        , ( "margin", "auto" )
        , ( "width", "90%" )
        ]
