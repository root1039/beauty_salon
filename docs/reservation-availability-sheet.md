# 予約可能日時カレンダー用 Google スプレッドシート

予約ページのカレンダーは、公開CSV化したGoogleスプレッドシートを読み込みます。

## シート形式

1行目に見出し、2行目以降に予約可能日を入れてください。

```csv
date,status
2026-06-01,both
2026-06-02,am
2026-06-03,pm
```

## 入力値

- `date`: `YYYY-MM-DD` 形式
- `status`: `both` / `am` / `pm`

表示は以下のようになります。

- `both`: `◎`
- `am`: `AM`
- `pm`: `PM`
- 行がない日、または空欄の日: `-`

## 公開CSV URL

Googleスプレッドシートで `ファイル > 共有 > ウェブに公開` を選び、CSV形式で公開します。
取得したCSV URLを GitHub の Repository Variables に `RESERVATION_SHEET_CSV_URL` として登録してください。

予約メールの送信先は `RESERVATION_EMAIL` に登録します。
