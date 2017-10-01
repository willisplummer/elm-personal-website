module View exposing (view)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Attributes.A11y exposing (pressed)
import Html.Events exposing (..)
import Types exposing (..)


view : Model -> Html Msg
view model =
    body
        [ mainStyle ]
        [ headerNav model
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
    header [ class "header", headerStyle ]
        [ h1 [ h1Style ] [ text "Willis Plummer" ]
        , nav []
            (List.intersperse (text " | ")
                (List.concatMap (\( description, msg, route ) -> [ button [ type_ "button", onClick msg, pressed <| Just (model.route == route), navItemStyle (model.route == route) ] [ text description ] ]) model.nav)
            )
        ]


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
