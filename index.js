const Elements = {
    DateElement: document.getElementById("date"),
    ClockElement: document.getElementById("clock"),
    ThemeElement: document.getElementById("theme"),
    ModeElement: document.getElementById("mode")
};

const ClockModes = {
    Analog: document.getElementById("analog-clock"),
    Digital: document.getElementById("digital-clock")
};

const AnalogHands = {
    Second: document.getElementById("second-hand"),
    Minute: document.getElementById("minute-hand"),
    Hour: document.getElementById("hour-hand")
};

let CurrentTheme = "dark";
let CurrentMode = "digital";

function GetFormattedTimeUnit(unit) {
    return unit < 10 ? "0" + unit : unit;
};

function GetCurrentTime() {
    const Now = new Date();
    return {
        Hours: GetFormattedTimeUnit(Now.getHours()),
        Minutes: GetFormattedTimeUnit(Now.getMinutes()),
        Seconds: GetFormattedTimeUnit(Now.getSeconds()),
        Day: GetFormattedTimeUnit(Now.getDate()),
        Month: GetFormattedTimeUnit(Now.getMonth() + 1),
        Year: Now.getFullYear()
    };
};

function UpdateAnalogHands() {
    const Now = new Date();
    const Seconds = Now.getSeconds();
    const Minutes = Now.getMinutes();
    const Hours = Now.getHours();

    const SecondRotation = Seconds * 6;
    const MinuteRotation = Minutes * 6;
    const HourRotation = Hours * 30;
    AnalogHands.Second.style.rotate = `${SecondRotation}deg`;
    AnalogHands.Minute.style.rotate = `${MinuteRotation}deg`;
    AnalogHands.Hour.style.rotate = `${HourRotation}deg`;
};

function UpdateClockAndDate() {
    try {
        const Time = GetCurrentTime();
        Elements.ClockElement.innerHTML = `${Time.Hours}:${Time.Minutes}:${Time.Seconds}`;
        Elements.DateElement.innerHTML = `${Time.Day}.${Time.Month}.${Time.Year}`;
    } catch (error) {
        console.error("An error occurred while updating the clock and date:", error);
    }
};

function ApplyTheme(ThemeConfig) {
    try {
        document.querySelectorAll("button").forEach(button => {
            button.style.backgroundColor = ThemeConfig.ButtonBgColor;
            button.style.color = ThemeConfig.ButtonTextColor;
        });
        document.body.style.color = ThemeConfig.TextColor;
        document.body.style.backgroundColor = ThemeConfig.BgColor;
        CurrentTheme = ThemeConfig.ThemeName;
        Elements.ThemeElement.textContent = ThemeConfig.ButtonText;
    } catch (error) {
        console.error("An error occurred while applying the theme:", error);
    }
};

function ApplyMode(ModeConfig) {
    try {
        Elements.ModeElement.innerHTML = ModeConfig.ButtonText;
        ClockModes.Analog.style.opacity = ModeConfig.AnalogOpacity;
        ClockModes.Digital.style.opacity = ModeConfig.DigitalOpacity;
    } catch (error) {
        console.error("An error occurred while applying the mode:", error);
    }
};

function ToggleTheme() {
    try {
        if (CurrentTheme === "dark") {
            ApplyTheme({
                TextColor: "rgb(50, 50, 50)",
                BgColor: "white",
                ThemeName: "light",
                ButtonText: "Theme: Dark",
                ButtonBgColor: "rgb(50, 50, 50)",
                ButtonTextColor: "white"
            });
        } else {
            ApplyTheme({
                TextColor: "white",
                BgColor: "rgb(50, 50, 50)",
                ThemeName: "dark",
                ButtonText: "Theme: Light",
                ButtonBgColor: "white",
                ButtonTextColor: "rgb(50, 50, 50)"
            });
        }
    } catch (error) {
        console.error("An error occurred while toggling the theme:", error);
    }
};

function ToggleMode() {
    if (CurrentMode === "digital") {
        CurrentMode = "analog";
        ApplyMode({
            ButtonText: "Mode: Digital",
            AnalogOpacity: "1",
            DigitalOpacity: "0",
        });
    } else if (CurrentMode === "analog") {
        CurrentMode = "digital";
        ApplyMode({
            ButtonText: "Mode: Analog",
            AnalogOpacity: "0",
            DigitalOpacity: "1",
        });
    }
};

function Init() {
    Elements.ThemeElement.addEventListener("click", ToggleTheme);
    Elements.ModeElement.addEventListener("click", ToggleMode);
    UpdateClockAndDate();
    setInterval(UpdateAnalogHands, 1000);
    setInterval(UpdateClockAndDate, 125);
};

Init();
