const score = document.querySelectorAll('.score')
const userImage = document.querySelectorAll('.user-image')
const username = document.querySelectorAll('.username')
const createdAt = document.querySelectorAll('.created-at')
const content = document.querySelectorAll('.content')
const replyingTo = document.querySelectorAll('.quote')

const mainContainer = document.getElementById('main-container')
const scoreContainer = document.querySelectorAll('.score-container')
const iconPlus = document.querySelectorAll('.icon-plus')
const iconMinus = document.querySelectorAll('.icon-minus')
const replyContainer = document.querySelectorAll('.reply-container')
const deleteContainer = document.querySelector('.delete-container')
const sendComment = document.querySelector('.reply-btn')

const currentComment = document.querySelectorAll('.comment-container')
const commentValue = document.querySelector('.add-comment')

const createEdit = document.createElement('section')
const createComment = document.createElement('section')
const editComment = document.createElement('section')

const overlay = document.querySelector('.overlay')
const modal = document.getElementById('modal')
const commentStay = document.querySelector('.comment-stay')
const commentDelete = document.querySelector('.comment-delete')

fetch('data.json')
    .then(response => response.json())
    .then(data => {
        score[0].innerText = data.comments[0].score
        score[1].innerText = data.comments[1].score
        score[2].innerText = data.comments[1].replies[0].score
        score[3].innerText = data.comments[1].replies[1].score

        userImage[0].src = data.comments[0].user.image.png
        userImage[1].src = data.comments[1].user.image.png
        userImage[2].src = data.comments[1].replies[0].user.image.png
        userImage[3].src = data.comments[1].replies[1].user.image.png
        userImage[4].src = data.currentUser.image.png

        username[0].innerText = data.comments[0].user.username
        username[1].innerText = data.comments[1].user.username
        username[2].innerText = data.comments[1].replies[0].user.username
        username[3].innerText = data.comments[1].replies[1].user.username

        createdAt[0].innerText = data.comments[0].createdAt
        createdAt[1].innerText = data.comments[1].createdAt
        createdAt[2].innerText = data.comments[1].replies[0].createdAt
        createdAt[3].innerText = data.comments[1].replies[1].createdAt

        content[0].innerText = data.comments[0].content
        content[1].innerText = data.comments[1].content
        content[2].innerText = data.comments[1].replies[0].content
        content[3].innerText = data.comments[1].replies[1].content

        replyingTo[0].innerText = '@' + data.comments[1].replies[0].replyingTo
        replyingTo[1].innerText = '@' + data.comments[1].replies[1].replyingTo

        for (let i = 0; i < 3; i++) {
            let currentScore = parseInt(score[i].innerText)
            iconPlus[i].addEventListener('click', () => {
                score[i].innerText = currentScore + 1
                scoreContainer[i].style.backgroundColor = 'lightgreen'
                iconMinus[i].addEventListener('click', () => {
                    score[i].innerText = currentScore
                    scoreContainer[i].style.backgroundColor = 'var(--light-grey)'
                    iconMinus[i].addEventListener('click', () => {
                        score[i].innerText = currentScore - 1
                        scoreContainer[i].style.backgroundColor = 'crimson'
                    })
                })
            })
            iconMinus[i].addEventListener('click', () => {
                score[i].innerText = currentScore - 1
                scoreContainer[i].style.backgroundColor = 'crimson'
                iconPlus[i].addEventListener('click', () => {
                    score[i].innerText = currentScore
                    scoreContainer[i].style.backgroundColor = 'var(--light-grey)'
                    iconPlus[i].addEventListener('click', () => {
                        score[i].innerText = currentScore + 1
                        scoreContainer[i].style.backgroundColor = 'lightgreen'
                    })
                })
            })

            const createReplyEl = document.createElement('section')
            const createAnswerEl = document.createElement('section')
            const editAnswerEl = document.createElement('section')

            function showModal() {
                overlay.style.display = 'block'
                modal.style.display = 'block'
            }

            function hideModal() {
                overlay.style.display = 'none'
                modal.style.display = 'none'
            }

            createReplyEl.innerHTML = `
                <section class="comment-container current-user">
                    <img class="user-image" src="${data.currentUser.image.png}"/>
                    <textarea
                    class="add-reply format-reply width-1"
                    cols="45"
                    rows="4"
                    >${'@' + username[i].innerText}
                    </textarea>
                    <button type="submit" class="reply-btn">Reply</button>
                </section>`

                createAnswerEl.innerHTML = `
                <section class="comment-container current-user">
                    <div class="score-container">
                        <img src="images/icon-plus.svg" class="icon-plus" alt="" />
                        <span class="score">0</span>
                        <img src="images/icon-minus.svg" class="icon-minus" alt="" />
                    </div>
        
                    <div class="comment">
                        <div class="user">
                            <div class="user-wrapper">
                            <img class="user-image" src="${data.currentUser.image.png}" />
                            <h3 class="username">${data.comments[1].replies[1].user.username}</h3>
                            <span class="you">you</span>
                            <small class="created-at">just now</small>
                            </div>
                        </div>
            
                        <span class="quote">${'@' + username[i].innerText}</span>
                        <p class="content"></p>
                    </div>
        
                    <div class="edit-reply">
                        <div class="delete-container">
                            <img src="images/icon-delete.svg" alt="" />
                            <span class="delete">Delete</span>
                        </div>
                        <div class="reply-container">
                            <img src="images/icon-edit.svg" alt="" />
                            <span class="reply">Edit</span>
                        </div>
                    </div>
                </section>`

                const writeAnswer = createReplyEl.querySelector('.add-reply')
                const postAnswer = createAnswerEl.querySelector('.content')
                const deleteAnswerContainer1 = createAnswerEl.querySelector('.delete-container')
                const editAnswerContainer1 = createAnswerEl.querySelector('.reply-container')

            replyContainer[i].addEventListener('click', () => {
                currentComment[i].after(createReplyEl)

                const replyBtn = createReplyEl.querySelector('.reply-btn')

                replyBtn.addEventListener('click', () => {
                    currentComment[i].after(createAnswerEl)
                    createReplyEl.style.display = 'none'

                    postAnswer.innerText = writeAnswer.value.replace('@' + username[i].innerText, '')

                    editAnswerEl.innerHTML = `
                    <section class="comment-container" style="position: relative">
                        <div class="comment">
                        <div class="user">
                            <div class="user-wrapper">
                            <img class="user-image" src="${data.currentUser.image.png}" />
                            <h3 class="username">${data.comments[1].replies[1].user.username}</h3>
                            <span class="you">you</span>
                            <small class="created-at"></small>
                            </div>
                        </div>

                        <span class="quote"></span>
                        <textarea class="add-reply format-reply width-2 mb" cols="40" rows="4">${'@' + username[i].innerText} ${postAnswer.innerText}</textarea>
                        </div>

                        <div class="edit-reply">
                            <div class="delete-container">
                                <img src="images/icon-delete.svg" alt="" />
                                <span class="delete">Delete</span>
                            </div>
                        </div>

                        <button type="submit" class="reply-btn" style="position: absolute; right: 5%; bottom: 5%">Update</button>
                    </section>`

                    const editAnswer = editAnswerEl.querySelector('.add-reply')
                    const deleteAnswerContainer2 = editAnswerEl.querySelector('.delete-container')
                    const updateAnswer = editAnswerEl.querySelector('.reply-btn')

                    deleteAnswerContainer1.addEventListener('click', () => {
                        showModal()

                        commentStay.addEventListener('click', () => {
                            createAnswerEl.style.display = 'block'
                            hideModal()
                        })

                        commentDelete.addEventListener('click', () => {
                            createAnswerEl.style.display = 'none'
                            hideModal()
                        })
                    })

                    editAnswerContainer1.addEventListener('click', () => {
                        createAnswerEl.replaceWith(editAnswerEl)

                        deleteAnswerContainer2.addEventListener('click', () => {
                            showModal()

                            commentStay.addEventListener('click', () => {
                                editAnswerEl.style.display = 'block'
                                hideModal()
                            })

                            commentDelete.addEventListener('click', () => {
                                editAnswerEl.style.display = 'none'
                                hideModal()
                            })
                        })

                        updateAnswer.addEventListener('click', () => {
                            editAnswerEl.replaceWith(createAnswerEl)

                            postAnswer.innerText = editAnswer.value.replace('@' + username[i].innerText, '')
                        })
                    })
                })
            })
        }

        replyContainer[3].addEventListener('click', () => {
            createEdit.innerHTML = `
            <section class="comment-container" style="position: relative">
                <div class="comment">
                <div class="user">
                    <div class="user-wrapper">
                    <img class="user-image" src="${data.currentUser.image.png}" />
                    <h3 class="username">${data.comments[1].replies[1].user.username}</h3>
                    <span class="you">you</span>
                    </div>
                </div>

                <span class="quote"></span>
                <textarea class="add-reply format-reply width-2 mb" cols="40" rows="4">${'@' + data.comments[1].replies[1].replyingTo} ${data.comments[1].replies[1].content}</textarea>
                </div>

                <div class="edit-reply">
                    <div class="delete-container">
                        <img src="images/icon-delete.svg" alt="" />
                        <span class="delete">Delete</span>
                    </div>
                </div>

                <button type="submit" class="reply-btn" style="position: absolute; right: 5%; bottom: 5%">Update</button>
        </section>`

        const editFirstAnswer = createEdit.querySelector('.add-reply')
        const deleteFirstAnswerContainer = createEdit.querySelector('.delete-container')
        const updateBtn = createEdit.querySelector('.reply-btn')

        currentComment[3].replaceWith(createEdit)

        deleteFirstAnswerContainer.addEventListener('click', () => {
            showModal()

            commentStay.addEventListener('click', () => {
                createEdit.style.display = 'block'
                hideModal()
            })

            commentDelete.addEventListener('click', () => {
                createEdit.style.display = 'none'
                hideModal()
            })
        })

            updateBtn.addEventListener('click', () => {
                createEdit.replaceWith(currentComment[3])

                createdAt[3].innerText = 'just now'
                content[3].innerText = editFirstAnswer.value
            })

            editFirstAnswer.innerText = content[3].innerText
        })

        deleteContainer.addEventListener('click', () => {
            showModal()

            commentStay.addEventListener('click', () => {
                currentComment[3].style.display = 'block'
                hideModal()
            })

            commentDelete.addEventListener('click', () => {
                currentComment[3].style.display = 'none'
                hideModal()
            })
        })

        sendComment.addEventListener('click', () => {
            createComment.innerHTML = `
                <section class="comment-container current-user">
                    <div class="score-container">
                        <img src="images/icon-plus.svg" class="icon-plus" alt="" />
                        <span class="score">0</span>
                        <img src="images/icon-minus.svg" class="icon-minus" alt="" />
                    </div>
        
                    <div class="comment">
                        <div class="user">
                            <div class="user-wrapper">
                            <img class="user-image" src="${data.currentUser.image.png}" />
                            <h3 class="username">${data.comments[1].replies[1].user.username}</h3>
                            <span class="you">you</span>
                            <small class="created-at">just now</small>
                            </div>
                        </div>
            
                        <p class="content"></p>
                    </div>
        
                    <div class="edit-reply">
                        <div class="delete-container">
                            <img src="images/icon-delete.svg" alt="" />
                            <span class="delete">Delete</span>
                        </div>
                        <div class="reply-container">
                            <img src="images/icon-edit.svg" alt="" />
                            <span class="reply">Edit</span>
                        </div>
                    </div>
                </section>`

                const commentContent = createComment.querySelector('.content')
                const deleteAnswerContainer3 = createComment.querySelector('.delete-container')
                const editAnswerContainer2 = createComment.querySelector('.reply-container')

                commentContent.innerText = commentValue.value

                currentComment[4].replaceWith(createComment)

                editComment.innerHTML = `
                <section class="comment-container" style="position: relative">
                    <div class="comment">
                    <div class="user">
                        <div class="user-wrapper">
                        <img class="user-image" src="${data.currentUser.image.png}" />
                        <h3 class="username">${data.comments[1].replies[1].user.username}</h3>
                        <span class="you">you</span>
                        </div>
                    </div>

                    <span class="quote"></span>
                    <textarea class="add-reply format-reply width-2 mb" cols="40" rows="4">${commentContent.innerText}</textarea>
                    </div>

                    <div class="edit-reply">
                        <div class="delete-container">
                            <img src="images/icon-delete.svg" alt="" />
                            <span class="delete">Delete</span>
                        </div>
                    </div>

                    <button type="submit" class="reply-btn" style="position: absolute; right: 5%; bottom: 5%">Update</button>
                </section>`

                const writeEdit = editComment.querySelector('.add-reply')
                const deleteEdit = editComment.querySelector('.delete-container')
                const updateComment = editComment.querySelector('.reply-btn')

                deleteAnswerContainer3.addEventListener('click', () => {
                    showModal()

                    commentStay.addEventListener('click', () => {
                        createComment.style.display = 'block'
                        hideModal()
                    })

                    commentDelete.addEventListener('click', () => {
                        createComment.style.display = 'none'
                        hideModal()
                    })
                })

                editAnswerContainer2.addEventListener('click', () => {
                    createComment.replaceWith(editComment)
                })

                deleteEdit.addEventListener('click', () => {
                    showModal()

                    commentStay.addEventListener('click', () => {
                        editComment.style.display = 'block'
                        hideModal()
                    })

                    commentDelete.addEventListener('click', () => {
                        editComment.style.display = 'none'
                        hideModal()
                    })
                })

                updateComment.addEventListener('click', () => {
                    commentContent.innerText = writeEdit.value
                    editComment.replaceWith(createComment)
                })
        })
    }).catch(error => {
        console.log('Error')
    })






