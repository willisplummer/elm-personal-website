module Views exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Messages exposing (..)
import Models exposing (..)
import Routing exposing (..)
import List exposing (..)


view : Model -> Html Msg
view model =
    body
        [ mainStyle ]
        [ div [ class "header", headerStyle ]
            [ h1 [ h1Style ] [ text "Willis Plummer" ]
            , nav model
            ]
        , content model
        ]


nav : Model -> Html Msg
nav model =
    div []
        (List.intersperse (text " | ")
            (List.concatMap (\( description, msg ) -> [ button [ type' "button", onClick msg, buttonStyle ] [ text description ] ]) model.nav)
        )


content : Model -> Html Msg
content model =
    case model.route of
        AboutRoute ->
            div [ class "content", contentStyle ]
                [ p [] [ text "Hi, I'm Willis" ]
                , p [] [ text "I'm a poet and a web developer based in Brooklyn" ]
                , p [] [ text "I'm also the Technical Operations Manager on Kickstarter's Support team" ]
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
