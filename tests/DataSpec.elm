module DataSpec exposing (spec)

import Data exposing (BookEntry, decodeReadingList)
import Expect
import Test exposing (..)


validYaml : String
validYaml =
    String.join "\n"
        [ "- title: neuromancer"
        , "  author: william gibson"
        , "  year: 2025"
        , "- title: cabin"
        , "  author: patrick hutchison"
        , "  year: 2024"
        ]


spec : Test
spec =
    describe "Data.decodeReadingList"
        [ test "parses a YAML sequence into BookEntry records, in order" <|
            \_ ->
                decodeReadingList validYaml
                    |> Expect.equal
                        (Ok
                            [ BookEntry "neuromancer" "william gibson" 2025
                            , BookEntry "cabin" "patrick hutchison" 2024
                            ]
                        )
        , test "an entry missing required fields is an Err" <|
            \_ ->
                decodeReadingList "- title: no author or year"
                    |> Expect.err
        ]
