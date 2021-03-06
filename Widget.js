const URL = "https://www.rprxy.xyz/places/api-get-details?assetId=6182388205"
const GroupAPIURL = "https://groups.roblox.com/v1/groups/8267330"
const Req = new Request(URL)
const Req2 = new Request(GroupAPIURL)
const LoadJSONURL = await Req.loadJSON()
const LoadGroupJSONURL = await Req2.loadJSON()

let AbbreviatedOnlineCount = AbbreviateNumber(LoadJSONURL.OnlineCount)
let AbbreviatedTotalUpVoteCount = AbbreviateNumber(LoadJSONURL.TotalUpVotes)
let AbbreviatedTotalFavorites = AbbreviateNumber(LoadJSONURL.FavoritedCount)
let AbbrevatedTotalVisits = AbbreviateNumber(LoadJSONURL.VisitedCount)
let GroupMembersTotal = AbbreviateNumber(LoadGroupJSONURL.memberCount)
let GamesName = LoadJSONURL.Name

function AbbreviateNumber(Value) {
    let NewValue = Value;

    const Suffixes = [
        "", 
        "K", 
        "M", 
        "B",
        "T"
    ];

    let SuffixNumber = 0;

    while (NewValue < 1000) {
        return Value;
    }

    while (NewValue >= 1000) {
        NewValue /= 1000;
        SuffixNumber++;
    }
  
    NewValue = NewValue.toPrecision(3);
    NewValue += Suffixes[SuffixNumber];

    return NewValue;
  }

if (config.runsInWidget) {
    let Widget = await CreateWidget(GamesName, `${AbbreviatedOnlineCount} Playing!`, `${AbbreviatedTotalUpVoteCount} Total Likes!`, `${AbbreviatedTotalFavorites} Total Favorites!`, `${AbbrevatedTotalVisits} Total Visits!`, `${GroupMembersTotal} Group Members!`)
    
    Script.setWidget(Widget)
    Script.complete()
} else {
    let Table = new UITable()
    let Row = new UITableRow()

    Row.isHeader = true
    Row.addText(GamesName)
    Table.addRow(Row)

    Table.addRow(CreateRow("Online Players", AbbreviatedOnlineCount))
    Table.addRow(CreateRow("Total Likes", AbbreviatedTotalUpVoteCount))
    Table.addRow(CreateRow("Total Favorites", AbbreviatedTotalFavorites))
    Table.addRow(CreateRow("Total Visits", AbbrevatedTotalVisits))
    Table.addRow(CreateRow("Group Members", GroupMembersTotal))

    if (config.runsWithSiri)
        Speech.speak("Go fuck yourself you did this shit wrong you fucker!")

    Table.present()
}

function CreateRow(title, number) {
    let Row = new UITableRow()

    Row.addText(title)
    Row.addText(number.toString()).rightAligned()

    return Row
}

function CreateWidget(title, playing, likes, favorites, visits, members) {
    let Widget = new ListWidget()

    let TitleText = Widget.addText(title)

    TitleText.textColor = new Color("#48db27")
    TitleText.textOpacity = 0.9
    TitleText = Font.systemFont(16)

    Widget.addSpacer(5)

    let PlayingText = Widget.addText(playing)

    PlayingText.textColor = Color.blue()
    PlayingText.textOpacity = 0.9
    TitleText = Font.systemFont(16)

    Widget.addSpacer(5)

    let LikedText = Widget.addText(likes)

    LikedText.textColor = Color.blue()
    LikedText.textOpacity = 0.9
    LikedText = Font.systemFont(16)

    Widget.addSpacer(5)

    let FavoritedText = Widget.addText(favorites)

    FavoritedText.textColor = Color.blue()
    FavoritedText.textOpacity = 0.9
    FavoritedText = Font.systemFont(16)

    Widget.addSpacer(5)
    
    let VisitedText = Widget.addText(visits)

    VisitedText.textColor = Color.blue()
    VisitedText.textOpacity = 0.9
    VisitedText = Font.systemFont(16)

    Widget.addSpacer(5)

    let GroupText = Widget.addText(members)

    GroupText.textColor = Color.blue()
    GroupText.textOpacity = 0.9
    GroupText = Font.systemFont(16)

    Widget.addSpacer(5)

    let StartColor = new Color("#000428")
    let EndColor = new Color("#004e92")
    let Gradient = new LinearGradient()

    Gradient.colors = [StartColor, EndColor]
    Gradient.locations = [0.0, 1]

    Widget.backgroundGradient = Gradient

    return Widget
}
