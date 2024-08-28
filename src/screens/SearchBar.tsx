import {Text, TextInput, TouchableOpacity, View} from "react-native";
import {Theme} from "../theme";
import {MagnifyingGlassIcon} from "react-native-heroicons/outline";
import {MapPinIcon} from "react-native-heroicons/solid";
import {useState} from "react";
import {DebouncedFunc} from "lodash";
import {ApiSearchSuggestion} from "../api/ApiResults";

type SearchBarProps = {
    placeHolder: string;
    onTextChanged: DebouncedFunc<(value: string) => void>;
    locations: ApiSearchSuggestion[];
    handleLocation: (location: ApiSearchSuggestion) => void
}

/**
 *
 * @param placeHolder : string the place holder for search bar.
 * @param onTextChanged : DebouncedFunc The debounced function to be called when text inside input changes.
 * @param locations {ApiSearchSuggestion[]}
 * @param handleLocation{(ApiSearchSuggestion) => void}
 *
 * @return {JSX.Element}
 */
export function SearchBar({placeHolder, onTextChanged, locations, handleLocation}: SearchBarProps) {

    const [showSearch, setShowSearch] = useState(false);

    return (
        <View>
            <View
                style={{
                    backgroundColor: showSearch ? Theme.bgWhite(0.2) : 'transparent',
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderRadius: 80,
                    marginTop: 10,
                    marginHorizontal: 10
                }}
            >

                {
                    showSearch ? (
                        <TextInput
                            style={{
                                paddingLeft: 20,
                                paddingVertical: 12,
                                flex: 1,
                                fontSize: 18,
                                color: 'white',
                            }}
                            placeholder={placeHolder}
                            onChangeText={onTextChanged}
                            placeholderTextColor={'lightgray'}/>
                    ) : null
                }
                <TouchableOpacity
                    onPress={() => {
                        setShowSearch(!showSearch);
                    }}
                    style={{
                        backgroundColor: Theme.bgWhite(0.3),
                        borderRadius: 50,
                        padding: 10,
                    }}
                >
                    <MagnifyingGlassIcon size="25" color="white"/>
                </TouchableOpacity>
            </View>
            {
                locations.length > 0 && showSearch ? (
                    <View
                        style={{
                            position: 'absolute',
                            width: '95%',
                            alignSelf: 'center',
                            backgroundColor: 'rgb(209 213 219)',
                            marginTop: 65,
                            borderRadius: 20,
                        }}
                    >
                        {
                            locations.map((location, index) => {
                                let showBorder = index + 1 !== locations.length;
                                let borderClass = showBorder ? 1 : 0;

                                return (
                                    <View>
                                        <TouchableOpacity
                                            key={index}
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                paddingVertical: 10,
                                                paddingHorizontal: 18,
                                                margin: 5,
                                                borderBottomWidth: borderClass,
                                                borderColor: 'darkgray'
                                            }}
                                            onPress={() => {
                                                setShowSearch(false);
                                                handleLocation(location)
                                            }}
                                        >
                                            <MapPinIcon size="20" color="gray"/>
                                            <Text
                                                style={{
                                                    color: 'black',
                                                    fontSize: 12,
                                                    marginLeft: 8,
                                                }}
                                            >{location?.name}, {location?.country}</Text>
                                        </TouchableOpacity>
                                    </View>
                                );
                            })
                        }
                    </View>
                ) : null
            }
        </View>

    );
}